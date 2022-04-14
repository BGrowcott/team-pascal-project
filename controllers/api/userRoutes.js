const router = require('express').Router();
const { User, Follow } = require('../../models');
var AWS = require('aws-sdk');
const withAuth = require('../../utils/auth');

//
// Data constructs and initialization.
//
var albumBucketName = process.env.ALBUMBUCKETNAME;
var bucketRegion = process.env.BUCKETREGION;
var IdentityPoolId = process.env.IDENTITYPOOLID;

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

router.post('/follow', withAuth, async (req, res) => {
  const alreadyFollowed = await Follow.findOne({
    where: {
      ...req.body,
      user_id: req.session.user_id,
    },
  });
  if (alreadyFollowed) {
    return;
  }
  try {
    await Follow.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json('Created new follow');
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// submit button
router.put('/save', withAuth, async (req, res) => {
  try {
    await User.update(req.body, {
      where: {
        id: req.session.user_id,
      },
    });

    res.status(200).json('new entries updated');
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
