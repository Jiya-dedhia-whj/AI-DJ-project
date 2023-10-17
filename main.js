song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;
songNo1 = 0;
songNo2 = 0;

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(700,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotPoses);
}

function modelLoaded()
{
    console.log("Model is Loaded");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;

        console.log("LeftWrist = "+ scoreLeftWrist + " , RightWrist = " + scoreRightWrist);

        console.log("leftWristX = "+leftWristX+ " , leftWristY = "+rightWristY);
        console.log("rightWristX = "+rightWristX+ " , rightWristY = "+rightWristY);
    }
}

function draw()
{
    image(video,0,0,700,500);
    fill("blue");
    stroke("darkblue");

    songNo1 = song1.isPlaying();
    console.log(songNo1);

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX,leftWristY,20);
        song2.stop();
        if(songNo1 == false)
        {
          song1.play();
          document.getElementById("song_id").innerHTML = "Song name : Song1"
        }
        
    }
}