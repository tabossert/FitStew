<?php
//Set title
$title = "ZuneFit Gym Panel";
?>
<!-- Header Start -->
<?php include 'html/header.php'; ?>
<!-- Header End -->
<script type="text/javascript">

    $(document).ready(function() {
             
    });
    
    
    
</script>

<input type="hidden" name="token" id="token" value="<?php echo $_SESSION['token']; ?>"/>		  
<div class="middle-container">
    <div class="left-part">
        <div class="blue-box1">

            <div id="infoBox" >
                <div>
                    <div class="calender1"><a id="day" href="#" onclick="widgets.user.getUserDaySchedule();"><img src="images/calender_img1.png" alt="" border="0" style="margin:0px 0px 7px 0px;" /></a><br />
                        DAY</div>
                    <div class="calender2"><a id= "week" href="#" onclick="widgets.user.getUserWeekSchedule()"><img src="images/calender_img2.png" alt="" border="0" style="margin:0px 0px 7px 0px;" /></a><br />
                        WEEK</div>
                    <div class="calender3"><a id= "month" href="#" onclick="widgets.user.getUserMonthSchedule()"><img src="images/calender_img3.png" alt="" border="0" style="margin:0px 0px 7px 0px;" /></a><br />
                        MONTH</div>
                    <div class="clr"></div>
                </div>
                <div style=" margin:15px 0px 0px 0px; border-top:1px solid #769196; height:1px;"></div>
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

            <div id="searchbox" style="display: none">
                <div style="text-align: center"><a href = "#">Search</a> | <a href = "#">Browse</a></div>
                <div>
                    <input type='text' name='address' id='address' />
                    <button onclick="setToken('<?php echo $_SESSION['token']; ?>');gymAdvancedSearch();">Search</button>  
                </div>
                <div id="search-result">
                </div>
            </div>

            <div id="preferences" style="display: none">
                <div class="up-blue-box">
                    <form id="preferences-form">
                        <table><tr><td>
                                    <label for="email" class="email" >  Email  </label></td><td>:</td><td>
                                    <input type="text" name="email" id="email" />
                                    <label for="email" class="error" generated="true"></label></td></tr>                        
                            <tr><td>
                                    <label for="firstName" class="firstName" >  First Name  </label></td><td>:</td><td>
                                    <input type="text" name="firstName" id="firstName"/>
                                    <label for="firstName" class="error" generated="true"></label></td></tr>
                            <tr><td>
                                    <label for="lastName" class="lastName" >  Last Name  </label></td><td>:</td><td>
                                    <input type="text" name="lastName" id="lastName" /> 
                                    <label for="lastName" class="error" generated="true"></label></td></tr>
                            <tr><td>
                                    <label for="address" class="address" > Address  </label></td><td>:</td><td>
                                    <input type="text" name="address" id="address" /> 
                                    <label for="address" class="error" generated="true"></label></td></tr>
                            <tr><td>
                                    <label for="city" class="city" > City  </label></td><td>:</td><td>
                                    <input type="text" name="city" id="city" /> 
                                    <label for="city" class="error" generated="true"></label></td></tr>
                            <tr><td>
                                    <label for="state" class="state" > State  </label></td><td>:</td><td>
                                    <input type="text" name="state" id="state" />   
                                    <label for="state" class="error" generated="true"></label></td></tr>
                            <tr><td>
                                    <label for="zipcode" class="zipcode" > Zipcode  </label></td><td>:</td><td>
                                    <input type="text" name="zipcode" id="zipcode" />
                                    <label for="zipcode" class="error" generated="true"></label></td></tr>
                            <tr><td>
                                    <button onclick="updateUserPref();">Update</button></td></tr>  
                        </table>
                    </form>
                </div>
            </div>

        </div>
    </div>
    <!--</div>-->
    <div class="tabs">
        <ul class="tabs-link">
            <li><a id="schedule" href="javascript:void(0);" onclick="widgets.user.loadLeft(0)">Schedule</a></li>
            <li><a href="#" id='gymsearch' onclick="widgets.user.loadLeft(1)">Gym Search</a></li>
            <li><a href="#" class="popup" rel="width:250;height:300" onclick="widgets.user.loadLeft(2);">Preferences</a></li>
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
