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
            <div id="shedule">
                <div>
                    <div class="calender1"><a id="day" href="#" onclick="widgets.gim.getGymDaySchedule();"><img src="images/calender_img1.png" alt="" border="0" style="margin:0px 0px 7px 0px;" /></a><br />
                        DAY</div>
                    <div class="calender2"><a id= "week" href="#" onclick="widgets.gim.getGymWeekSchedule()"><img src="images/calender_img2.png" alt="" border="0" style="margin:0px 0px 7px 0px;" /></a><br />
                        WEEK</div>
                    <div class="calender3"><a id= "month" href="#" onclick="widgets.gim.getGymMonthSchedule()"><img src="images/calender_img3.png" alt="" border="0" style="margin:0px 0px 7px 0px;" /></a><br />
                        MONTH</div>
                    <div class="clr"></div>
                </div>
                <div style=" margin:15px 0px 0px 0px; border-top:1px solid #769196; height:1px;"></div>
                <div id='gymScheduleBox'>
                    <div class="inner-txt">

                    </div>
                </div>
            </div>
        </div>

    </div>
    <div id="light" class="white_content">
        <a class="topright" href = "javascript:void(0)" onclick = "$('#light, #fade').css('display','none');">Close</a>
        <div class = "my-box2">
            <ul class = "toplink">
                <li><a href = "#">Description</a></li>
                <li><a href = "#">Schedule</a></li>
                <li><a href = "#">Rate</a></li>
                <li><a href = "#" >Services</a></li>
            </ul>
        </div>
        
    </div>
    <div id="fade" class="black_overlay"></div>
    <div class="tabs">
        <ul class="tabs-link">
            <li><a href = "javascript:void(0)" onclick = "$('#light, #fade').css('display','block');">Profile</a></li>
            <li><a href="ownerServices.php" >Services</a></li>
            <li><a href="ownerAnalytics.php" >Analytics</a></li>
            <li><a href="#" >Preferences</a></li>
        </ul>
    </div>

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
