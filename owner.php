<?php
//Set title
$title = "ZuneFit Gym Panel";
?>
<!-- Header Start -->
<?php include 'html/header.php'; ?>

<input type="hidden" name="token" id="token" value="<?php echo $_SESSION['token']; ?>"/>
<input type="hidden" name="gid" id="gid" value="<?php echo $_SESSION['gid']; ?>" />
<input type="hidden" name="gname" id="gname" value="<?php echo $_SESSION['gname']; ?>"/>
<div class="middle-container">
    <div class="inner-left-part">

        <div >
            <ul id="inner-nav" style="padding-left: 14px;">
                <li><a href = "#lightbox" class="light" >Profile</a></li>
                <li><a href="owner.php" class="selected">Schedule</a></li>
                <li><a href="ownerServices.php" >Services</a></li>
                <li><a href="ownerAnalytics.php" >Analytics</a></li>
                <li><a href="ownerProfile.php" >Preferences</a></li>

            </ul>

        </div>

        <div class="clr" ></div>
        <div class="blue-box1">
            <div id="shedule" style="min-height: 360px;">
                <div style="width: 10.5% ;float: left; border-right: solid; border-color: #565D60;">
                    <div class="inner-calender1" style="clear: both; margin-top: 25px; "><a id="day" href="#" onclick="widgets.gim.getGymDaySchedule();"><img src="images/day_cal.png" alt="" border="" style="margin:0px 0px 7px 0px;" /></a><br />
                        DAY</div>

                    <div class="inner-calender2" style="clear: both;margin-top: 25px;"><a id= "week" href="#" onclick="widgets.gim.getGymWeekSchedule()"><img src="images/week_cal.png" alt="" border="0" style="margin:0px 0px 7px 0px;" /></a><br />
                        WEEK</div>
                    <div class="inner-calender3" style="clear: both;margin-top: 25px;"><a id= "month" href="#" onclick="widgets.gim.getGymMonthSchedule()"><img src="images/month_cal.png" alt="" border="0" style="margin:0px 0px 7px 0px;" /></a><br />
                        MONTH</div>

                </div>
                <div><a href = "#lightboxw" class="light" style="color: midnightblue;font: bold 14px 'Georgia' ;">New Schedule<img src="images/new.png"/></a></div>
                <div class="inner-txt" style="width: 70% ;float: right; margin-left: 10px;">

                </div>
            </div>
        </div>

    </div>
    <div style="display: none;">

      <?php  include('profile.php'); ?>

    </div>
    <!--    <div class="tabs">
            <ul class="tabs-link">
                <li><a href = "javascript:void(0)" onclick = "$('#light, #fade').css('display','block');">Profile</a></li>
                <li><a href="ownerServices.php" >Services</a></li>
                <li><a href="ownerAnalytics.php" >Analytics</a></li>
                <li><a href="#" >Preferences</a></li>
            </ul>
        </div>-->

    <div class="right-box">
        <div class="balance"></div>
        <div class="right-featured-box" id="owner-right-featured-box">
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
