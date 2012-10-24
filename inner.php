<?php
//Set title
$title = "ZuneFit Gym Panel";
?>
<!-- Header Start -->
<?php include 'html/header.php'; ?>
<!-- Header End -->

<link rel="stylesheet" href="jqueryui/jqueryui.css" />
<script src="jqueryui/jqueryui.js"></script>



<input type="hidden" name="utoken" id="utoken" value="<?php echo $_SESSION['token']; ?>"/>		  
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
                <div class="up-blue-box">

                    <div style="text-align: center"><a href = "#" onclick="widgets.user.search(0)">Search</a> | <a href = "#" onclick="widgets.user.search(1)">Advanced Search</a></div>
                    <hr/><br/>
                    <div id="search">
                        <div>
                            <input type='text' name='address' id='address' />
                            <button onclick="setToken('<?php echo $_SESSION['token']; ?>');gymAdvancedSearch();">Search</button>  
                        </div>
                        <div id="search-result">
                        </div>
                    </div>

                    <div id="advSearch" style="display: none">
                        <div>
                            <p class="underline_title">Type</p>
                            <table>
                                <tr>
                                    <td><input type="checkbox" id="boxing" ></td><td>Boxing</td>                      
                                    <td><input type="checkbox" id="cycling"></td> <td>Cycling</td>
                                </tr>
                            </table>
                            <br/>
                            <p class="underline_title">Location</p>
                            <table>
                                <tr>
                                    <td>
                                        <label for="Miles" class="Miles" >  Miles  </label></td><td>
                                        <input type="text" name="Miles" id="Miles" placeholder="within"/>
                                        <label for="Miles" class="error" generated="true"></label></td><td>
                                        <label for="Within" class="Within" >  Within  </label></td><td>
                                        <input type="text" name="Within" id="Within" placeholder="zip/city"/> 
                                        <label for="Within" class="error" generated="true"></label>
                                    </td>
                                </tr>
                            </table>
                            <br/>
                            <p class="underline_title">Rate</p>
                            <br/>
                            <div id="slider-range-min"></div>
                            <br/>
                            <p>
                                <input type="text" id="amount" name="amount" readonly style="background: none;border: none;"/>
                            <p>Dollars (stars at 1$)</p>                                
                            </p>
                            <br/>
                            <p class="underline_title">Keyword</p>
                            <input type="text" name="keyword" id="keyword" placeholder="keyword"/>
                            <div style="float: right;">
                                <button onclick="widgets.user.AdvancedSearch();" >Search</button>
                            </div>
                        </div>
                        <div id="advSearch-result">
                        </div>
                    </div>
                </div>
            </div>

            <div id="preferences" style="display: none">
                <div class="up-blue-box">


                    <div style="text-align: center"><a href = "#" onclick="widgets.user.preferencesBilling(0)">Preferences</a> | <a href = "#" onclick="widgets.user.preferencesBilling(1)">Billing</a></div>
                    <hr/>
                    <div id="preference">
                        <table class="pref">
                            <tr><td>
                                    <label for="firstName" class="firstName" >  First Name  </label></td><td>:</td><td>
                                    <input type="text" name="firstName" id="firstName"/>
                                    <label for="firstName" class="error" generated="true"></label></td></tr>
                            <tr><td>
                                    <label for="lastName" class="lastName" >  Last Name  </label></td><td>:</td><td>
                                    <input type="text" name="lastName" id="lastName" /> 
                                    <label for="lastName" class="error" generated="true"></label></td></tr>
                            <tr><td>
                                    <label for="email" class="email" >  Email  </label></td><td>:</td><td>
                                    <input type="text" name="email" id="email" />
                                    <label for="email" class="error" generated="true"></label></td></tr>                        

                            <tr><td>
                                    <label for="address" class="address" > Address  </label></td><td>:</td><td>
                                    <input type="text" name="address" id="address" /> 
                                    <label for="address" class="error" generated="true"></label></td></tr>

                        </table>
                        <div style="float: right;">
                            <button onclick="updateUserPref();">Update</button>
                        </div>  

                        <a href="#">Change password</a>

                    </div>
                    <div id="billing" style="display: none;">
                        <table class="pref">
                            <tr><td>
                                    <label for="bfirstName" class="bfirstName" >  First Name  </label></td><td>:</td><td>
                                    <input type="text" name="bfirstName" id="bfirstName"/>
                                    <label for="bfirstName" class="error" generated="true"></label></td></tr>
                            <tr><td>
                                    <label for="blastName" class="blastName" >  Last Name  </label></td><td>:</td><td>
                                    <input type="text" name="blastName" id="blastName" /> 
                                    <label for="blastName" class="error" generated="true"></label></td></tr>
                            <tr><td>
                                    <label for="baddress" class="baddress" >  Billing Address  </label></td><td>:</td><td>
                                    <input type="text" name="baddress" id="baddress" />
                                    <label for="baddress" class="error" generated="true"></label></td></tr> 
                            <tr><td>
                                    <label for="bcredit" class="bcredit" >  Credit card  </label></td><td>:</td><td>
                                    <input type="text" name="bcredit" id="bcredit" />
                                    <label for="bcredit" class="error" generated="true"></label></td></tr> 
                        </table>
                    </div>
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
