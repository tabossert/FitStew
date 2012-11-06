<?php
//Set title
$title = "ZuneFit Gym Panel";
?>
<!-- Header Start -->
<?php include 'html/header.php'; ?>
<link rel="stylesheet" type="text/css" href="jqueryui/jqueryui.css" />
<script type="text/javascript" src="jqueryui/jqueryui.js" ></script>
<script type="text/javascript" src="scroll/scroll.js" ></script>

<!-- Header End -->
<input type="hidden" name="utoken" id="utoken" value="<?php echo $_SESSION['token']; ?>"/>
<input type="hidden" name="userid" id="userid" value="<?php echo $_SESSION['userid']; ?>"/>
<div class="middle-container">

    <div class="inner-left-part">
        <div >
            <ul id="inner-nav">
                <li id="schedule-tab" class="selected"><a  href="javascript:void(0);" onclick="widgets.user.loadLeft(0)">Schedule</a></li>
                <li id='gymsearch-tab'><a  href="javascript:void(0);"  onclick="widgets.user.loadLeft(1)">Gym Search</a></li>
                <li id="Preferences-tab"><a  href="javascript:void(0);"  onclick="widgets.user.loadLeft(2);">Preferences</a></li>
            </ul>

        </div>
        <div class="clr" ></div>

        <div class="blue-box1" >

            <div id="infoBox" style="min-height: 340px;">
                <div style="width: 10.5% ;float: left; border-right: solid; border-color: #565D60;">
                    <div class="inner-calender1" style="clear: both; margin-top: 25px; "><a id="day" href="#" onclick="widgets.user.getUserDaySchedule();"><img src="images/calendar_selection_day_48.png" alt="" border="" style="margin:0px 0px 7px 0px;" /></a><br />
                        DAY</div>

                    <div class="inner-calender2" style="clear: both;margin-top: 25px;"><a id= "week" href="#" onclick="widgets.user.getUserWeekSchedule()"><img src="images/calendar_selection_week_48.png" alt="" border="0" style="margin:0px 0px 7px 0px;" /></a><br />
                        WEEK</div>
                    <div class="inner-calender3" style="clear: both;margin-top: 25px;"><a id= "month" href="#" onclick="widgets.user.getUserMonthSchedule()"><img src="images/calendar_selection_month_48.png" alt="" border="0" style="margin:0px 0px 7px 0px;" /></a><br />
                        MONTH</div>

                </div>

                <div class="inner-txt" style="width: 70% ;float: right; margin-left: 10px;">

                </div>


            </div>

            <div id="searchbox" style="display: none ;min-height: 340px; font-size: 1.1em;">
                <!--                <div class="up-blue-box">-->

                <div style="text-align: center;"><a href = "#" onclick="widgets.user.search(0)">Search</a> | <a href = "#" onclick="widgets.user.search(1)">Advanced Search</a></div>
                <hr/><br/>
                <div id="search">
                    <div>


                        <label for="searchRadio">Search by</label><p style="margin-left: 50px;"><br/>
                            <input type="radio" name="searchRadio" value="activity" id="activity" checked><label for="activity">Fitness activity</label><br/><br/>
                            <input type="radio" name="searchRadio" value="center" id="center"><label for="center">Fitness center</label><br/><br/></p>
                        <form class="searchform" >
                            <input class="searchfield" type="text" name='searchkey' id='searchkey' placeholder="Search..."  />
                            <input class="searchbutton" type="button" value="Go" onclick="widgets.user.searchMe()"/>


                        </form>  
                    </div>
                    <br/>
                    <div class="clr" style="border-bottom: solid; border-bottom-color: #184A61;"></div>
                    <br/>
                    <div id="search-result" style="text-align: center;">
                        <a href = "#lightbox" class="light" onclick="">Search</a>
                        <a href = "#lightbox" class="light" onclick=""> Result</a>
                    </div>
                </div>

                <div id="advSearch" style="display: none">
                    <div>
                        <p class="underline_title">Type</p>
                        <table style="margin-left: 30px;">
                            <tr id="search-service">


                            </tr>
                        </table>
                        <br/>
                        <p class="underline_title">Location</p>
                        <table style="margin-left: 30px;">
                            <tr>
                                <td style="width: 50px;">
                                    <label for="Miles"  class="style_text">  Miles  </label></td><td>
                                    <input type="text" name="Miles" id="Miles"  class="round" placeholder="within.." style="font-style: normal;"/>
                                </td>
                                <td style="width: 70px; text-align: center;">
                                    <label for="Within"  class="style_text">  Within  </label></td><td>
                                    <input type="text" name="Within" id="Within" placeholder="zip / city.." class="round" style="font-style: normal;"/> 

                                </td>
                            </tr>
                        </table>
                        <br/>
                        <p class="underline_title">Rate</p>
                        <br/>
                        <div id="slider-range-min"></div>
                        <br/>
                        <p>
                            <input type="text" class="style_text" id="amount" name="amount" readonly style="background: none;border: none;margin-left: 30px; font-size: 1em;"/>
                        <p style="margin-left: 30px;" class="style_text">Dollars (stars at 1$)</p>                                
                        </p>
                        <br/>
                        <span class="underline_title" >Keyword</span>
                        <input type="text" name="keyword" id="keyword" placeholder="keyword" class="round" style="margin-left: 30px;font-style: normal;"/>
                        <div style="float: right;">
                            <span class="buttons" onclick="widgets.user.advancedSearch();" >Search</span>
                        </div>
                    </div>
                    <br/>
                    <div class="clr" style="border-bottom: solid; border-bottom-color: #184A61;"></div>
                    <div id="advSearch-result">
                    </div>
                </div>

            </div>

            <div id="preferences" style="display: none ;min-height: 340px; ">



                <div style="text-align: center ;font-size: 1.2em;"><a href = "#"  onclick="widgets.user.preferencesBilling(0)">Preferences</a> | <a href = "#"  onclick="widgets.user.preferencesBilling(1)">Billing</a></div>
                <hr/>
                <div id="preference">
                    <span style="float: right;"><a href="#" onclick="widgets.user.edit()">edit</a>|<a href="#" onclick="widgets.user.update()">done</a></span>
                    <table class="pref">
                        <tr><td>
                                <label for="firstName" class="firstName" >  First Name  </label></td><td>:</td><td>
                                <input type="text" name="firstName" id="firstName" class="transparent"/>
                                <label for="firstName" class="error" generated="true"></label></td></tr>
                        <tr><td>
                                <label for="lastName" class="lastName" >  Last Name  </label></td><td>:</td><td>
                                <input type="text" name="lastName" id="lastName" class="transparent"/> 
                                <label for="lastName" class="error" generated="true"></label></td></tr>
                        <tr><td>
                                <label for="email" class="email" >  Email  </label></td><td>:</td><td>
                                <input type="text" name="email" id="email" class="transparent"/>
                                <label for="email" class="error" generated="true"></label></td></tr>                        

                        <tr><td>
                                <label for="address" class="address" > Address  </label></td><td>:</td><td>
                                <input type="text" name="address" id="address" class="transparent"/> 
                                <label for="address" class="error" generated="true"></label></td></tr>

                    </table>


                </div>
                <div id="billing" style="display: none;">
                    <table class="pref">
                        <tr><td>
                                <label for="bfirstName" class="bfirstName" >  First Name  </label></td><td>:</td><td>
                                <input type="text" name="bfirstName" id="bfirstName" class="transparent"/>
                                <label for="bfirstName" class="error" generated="true"></label></td></tr>
                        <tr><td>
                                <label for="blastName" class="blastName" >  Last Name  </label></td><td>:</td><td>
                                <input type="text" name="blastName" id="blastName"  class="transparent"/> 
                                <label for="blastName" class="error" generated="true"></label></td></tr>
                        <tr><td>
                                <label for="baddress" class="baddress" >  Billing Address  </label></td><td>:</td><td>
                                <input type="text" name="baddress" id="baddress" class="transparent"/>
                                <label for="baddress" class="error" generated="true"></label></td></tr> 
                        <tr><td>
                                <label for="bcredit" class="bcredit" >  Credit card  </label></td><td>:</td><td>
                                <input type="text" name="bcredit" id="bcredit" class="transparent"/>
                                <label for="bcredit" class="error" generated="true"></label></td></tr> 
                    </table>
                </div>

            </div>

        </div>
    </div>
    <!--</div>-->

    <div class="right-box">
        <div class="balance-box" id="balanceBox">
        </div>
        <div class="right-featured-box">
            <h1>Featured Gyms</h1>
            <div id="featuredGymsBox">
            </div>
        </div>
        <div style="height:20px;"></div>
        <div class="right-featured-box" >
            <h1>Popular Workouts</h1>
            <ul class="user-item-link">


            </ul>
        </div>



    </div>
    <div style="display: none;">
        <div name="lightbox" id="lightbox" class="blue-box2" style="height: 400px; width: 400px; ">
            <div>
                <div class = "my-box2" >
                    <p>
                    <ul class = "toplink">
                        <li><a href = "#" onclick="widgets.user.loadBox(0)">Description</a></li>
                        <li><a href = "#" onclick="widgets.user.loadBox(1)">Schedule</a></li>
                        <li><a href = "#" onclick="widgets.user.loadBox(2)">Rate</a></li>
                        <li><a href = "#" onclick="widgets.user.loadBox(3)">Services</a></li>
                    </ul>
                    </p>
                </div>



                <div id="divexample1" style=" color: green; height: 350px;float: left;width: 390px;">
                    <div id="box-description" >
                        <table class="pref">
                            <tr><td>
                                    <label for="gymName" > Gym Name  </label></td><td>:</td><td>
                                    <input type="text" name="gymName" id="gymName" class="transparent"/>
                                </td></tr>
                            <tr><td>
                                    <label for="address"  >  Address  </label></td><td>:</td><td>
                                    <input type="text" name="address" id="address" class="transparent"/> 
                                </td></tr>
                            <tr><td>
                                    <label for="city"  >  City  </label></td><td>:</td><td>
                                    <input type="text" name="city" id="city" class="transparent"/>
                                </td></tr>                        

                            <tr><td>
                                    <label for="state"  > State  </label></td><td>:</td><td>
                                    <input type="text" name="state" id="state" class="transparent"/> 
                                </td></tr>
                            <tr><td>
                                    <label for="zipcode" > Zip Code  </label></td><td>:</td><td>
                                    <input type="text" name="zipcode" id="zipcode" class="transparent"/>
                                </td></tr>
                            <tr><td>
                                    <label for="phone"  >  Phone  </label></td><td>:</td><td>
                                    <input type="text" name="phone" id="phone" class="transparent"/> 
                                </td></tr>
                            <tr><td>
                                    <label for="email"  >  email  </label></td><td>:</td><td>
                                    <input type="text" name="email" id="email" class="transparent"/>
                                </td></tr>                        

                            <tr><td>
                                    <label for="contact"  > Contact  </label></td><td>:</td><td>
                                    <input type="text" name="contact" id="contact" class="transparent"/> 
                                </td></tr>

                        </table>
                    </div>   
                    <div id="box-Schedule" style="display: none; " >

                    </div>   
                    <div id="box-Rate" style="display: none ; " >Rate</div>   
                    <div id="box-Services" style="display: none;" >

                    </div>   
                </div>

            </div>
            <div id="box-footer" style="color: #565D60; clear: both;" ><a href="#schedule-form" class="light">Add to my schedule</a></div>
        </div>

    </div>
    <div style="display: none;">
        <div name="schedule-form" id="schedule-form" class="blue-box2" style="color: green; width: 400px; height: 400px;">
            <div >
                <label for="time">Times</label>
                <select name="time">
                    <option value="0" selected>Times</option>
                    <option value="1">one</option>
                    <option value="2">two</option>
                    <option value="3">three</option>
                </select>
                <label for="date">Date</label>
                <input type="text" id="datepicker" />
                <br/>

                <input type="checkbox" id="reoccuring" name="reoccuring" onclick="widgets.user.reoccur();"/>
                <label for="reoccuring">Reoccuring</label>
                <select name="occur" id="occur" disabled>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                </select>

                <p><label for="notes">Notes</label>
                </p><p><textarea name="notes" id="notes" placeholder="Notes"></textarea></p>
                <button>Submit</button>
            </div>

        </div>

    </div>
</div>
<div class="clr"></div>
<!-- Footer Start -->
<?php include 'html/footer.php'; ?>
<!-- Footer End -->
</body>
</html>
