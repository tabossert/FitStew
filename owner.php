<?php 
    //Set title
    $title = "ZuneFit Gym Panel"; 
?>
<!-- Header Start -->
<?php include 'html/header.php'; ?>
<!-- Header End -->

<input type="hidden" name="token" id="token" value="<?php echo $_SESSION['token']; ?>"/>
<div class="middle-container">
    <div class="left-part">
        <div class="blue-box1">
            <div>
                <div class="calender1"><a href="#"><img src="images/calender_img1.png" alt="" border="0" style="margin:0px 0px 7px 0px;" /></a><br />
                    DAY</div>
                <div class="calender2"><a href="#"><img src="images/calender_img2.png" alt="" border="0" style="margin:0px 0px 7px 0px;" /></a><br />
                    WEEK</div>
                <div class="calender3"><a href="#"><img src="images/calender_img3.png" alt="" border="0" style="margin:0px 0px 7px 0px;" /></a><br />
                    MONTH</div>
                <div class="clr"></div>
            </div>
            <div style=" margin:15px 0px 0px 0px; border-top:1px solid #769196; height:1px;"></div>
            <div id='gymScheduleBox'>
                <div class="inner-txt">
                    <h1>Monday, April 1st, 2012</h1>
                    <ul class="calender-link">
                        <li><a href="#">Tervor Bossert</a></li>
                        <li><a href="#">Antony Zimzores</a></li>
                        <li><a href="#">Daniel Jensen</a></li>
                    </ul>
                    <h1>Monday, April 2nd, 2012</h1>
                    <ul class="calender-link">
                        <li><a href="#">Tervor Bossert</a></li>
                        <li><a href="#">Antony Zimzores</a></li>
                        <li><a href="#">Daniel Jensen</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="tabs">
        <ul class="tabs-link">
            <li><a href="#">Profile</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Analytics</a></li>
            <li><a href="#">Preferences</a></li>
        </ul>
    </div>
    <div class="balance"></div>
    <div class="right-box">
        <div class="right-featured-box">
            <h1>Quick State</h1>
            <ul class="item-link">                
            </ul>
        </div>
    </div>
</div>
<div class="clr"></div>
<!-- Footer Start -->
<?php include 'html/footer.php'; ?>
<!-- Footer End -->
</body>
</html>
