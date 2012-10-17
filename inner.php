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
            <div id="infoBox">
                <!--<div>
                  <div class="calender1"><a id="day" href="#"><img src="images/calender_img1.png" alt="" border="0" style="margin:0px 0px 7px 0px;" /></a><br />
            DAY</div>
                  <div class="calender2"><a id= "week" href="#"><img src="images/calender_img2.png" alt="" border="0" style="margin:0px 0px 7px 0px;" /></a><br />
            WEEK</div>
                  <div class="clr"></div>
                </div>
                <div style=" margin:15px 0px 0px 0px; border-top:1px solid #769196; height:1px;"></div>
                <div class="inner-txt">
                  <div id="infoBox">
                  </div>-->	
            </div>
        </div>

        <div class="blue-box1">
            <div id="searchbox" style='display:none'>
                <input type='text' name='address' id='address' />
                <button onclick="setToken('<?php echo $_SESSION['token']; ?>');gymAdvancedSearch();">Search</button>  
                <!--<div>
                  <div class="calender1"><a id="day" href="#"><img src="images/calender_img1.png" alt="" border="0" style="margin:0px 0px 7px 0px;" /></a><br />
            DAY</div>
                  <div class="calender2"><a id= "week" href="#"><img src="images/calender_img2.png" alt="" border="0" style="margin:0px 0px 7px 0px;" /></a><br />
            WEEK</div>
                  <div class="clr"></div>
                </div>
                <div style=" margin:15px 0px 0px 0px; border-top:1px solid #769196; height:1px;"></div>
                <div class="inner-txt">
                  <div id="infoBox">
                  </div>-->	
            </div>
        </div>
    </div>
    <!--</div>-->
    <div class="tabs">
        <ul class="tabs-link">
            <li><a id="schedule" href="javascript:void(0);">Schedule</a></li>
            <li><a href="#" id='gymsearch'>Gym Search</a></li>
            <li><a href="pages/userPref.php" class="popup" rel="width:250;height:300">Preferences</a></li>
        </ul>
    </div>
    <div class="right-box">
        <div class="balance-box" id="balanceBox">
        </div>
        <div class="right-featured-box">
            <h1>Featured Gyms</h1>
            <div id="featuredGymsBox">
            </div>
        </div>
        <div style="height:20px;"></div>
        <div class="right-featured-box">
            <h1>Popular Workouts</h1>
            <ul class="item-link">
                <li><a href="#">Item 1</a></li>
                <li><a href="#">Item 2</a></li>
                <li><a href="#">Item 3</a></li>
                <li><a href="#">Item 4</a></li>
                <li><a href="#">Item 5</a></li>
                <li><a href="#">Item 6</a></li>
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
