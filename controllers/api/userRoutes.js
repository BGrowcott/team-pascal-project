const router = require('express').Router();
const { User } = require('../../models');
var AWS = require('aws-sdk');

//
// Data constructs and initialization.
//

// **DO THIS**:
//   Replace BUCKET_NAME with the bucket name.
//

var albumBucketName = process.env.ALBUMBUCKETNAME;
var bucketRegion = process.env.BUCKETREGION;
var IdentityPoolId = process.env.IDENTITYPOOLID;

// **DO THIS**:
//   Replace this block of code with the sample code located at:
//   Cognito -- Manage Identity Pools -- [identity_pool_name] -- Sample Code -- JavaScript
//
// Initialize the Amazon Cognito credentials provider
AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId,
  }),
});

var s3 = new AWS.S3({
  apiVersion: '2012-10-17',
  params: { Bucket: albumBucketName },
});

router.post('/profilepic', async (req, res) => {
  const file = Buffer.from(
    req.body.profile_pic.replace(/^data:image\/\w+;base64,/, ''),
    'base64'
  );
  const extn = req.body.extn;
  
  var albumPhotosKey = encodeURIComponent('images') + '/';

  var photoKey = albumPhotosKey + req.session.user_id + '.' + extn;

  var upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: albumBucketName,
      Key: photoKey,
      Body: file,
      ContentEncoding: 'base64',
      ContentType: 'image/' + extn,
    },
  });

  var promise = upload.promise();

  promise.then(
    function (data) {
      console.log('Successfully uploaded photo.');
    },
    function (err) {
      return console.log(
        'There was an error uploading your photo: ',
        err.message
      );
    }
  );

  try {
    const newPicture = await User.update(
      {
        profile_picture: `https://teampascal.s3.eu-west-2.amazonaws.com/images/${req.session.user_id}.${extn}`,
      },
      {
        where: {
          id: req.session.user_id,
        },
      }
    );
    res.status(200).json(newPicture);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
