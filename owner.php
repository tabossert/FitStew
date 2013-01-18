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

                <div style="float: left;"><a href = "#lightboxw" class="light" style="float: left;color: midnightblue;font: bold 14px 'Georgia' ;"><img src="images/new.png"/><span style="position: re">New Class</span></a></div>
                <div id="simplify" onclick="widgets.gim.newSchedule();" style="cursor: pointer;height: 10px;width: auto;"><a href = "#lightboxSchedule" class="light"><img src="images/time.png" alt="" border="0" style="margin:0px 0px 17px 0px;position: relative;left: 120px;" /></a></div>

                <div style="float: right;padding: 15px;color: midnightblue;font: bold 14px 'Georgia' ;"><label for="class_day" style="padding: 5px;">Select day</label><input value="<?php echo date('y-m-d'); ?>" type="text" id="class_day" class="round datepicker"  onchange="widgets.gim.getDayclasses($('#class_day').val());"/></div>
                <div class="inner-txt" style="width: 80% ;float: right; margin-left: 10px;">

                </div>
            </div>
        </div>

    </div>
    <div style="display: none;">

        <?php include('profile.php'); ?>

    </div>
    <div style="display: none;">

        <div name="lightboxes" id="lightboxes" class="blue-box2" style="height: 400px; width: 500px; ">
            <div id="class_info" style="width: 250px;float: left;"></div> <div id="class_sched" style="float: left;width: 240px;"></div>
        </div>

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
