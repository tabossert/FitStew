<?php
//Set title
$title = "ZuneFit Gym Panel";
?>
<!-- Header Start -->
<?php include 'html/header.php'; ?>
<link rel="stylesheet" href="jqueryui/jqueryui.css" />
<script src="jqueryui/jqueryui.js"></script>

<!-- Header End -->
<input type="hidden" name="utoken" id="utoken" value="<?php echo $_SESSION['token']; ?>"/>
<div class="middle-container">

    <div class="inner-left-part">
        <div >
            <ul id="inner-nav">
                <li id="schedule-tab"><a  href="javascript:void(0);" onclick="widgets.user.loadLeft(0)">Schedule</a></li>
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

            <div id="searchbox" style="display: none ;min-height: 340px;">
                <!--                <div class="up-blue-box">-->

                <div style="text-align: center"><a href = "#" onclick="widgets.user.search(0)">Search</a> | <a href = "#" onclick="widgets.user.search(1)">Advanced Search</a></div>
                <hr/><br/>
                <div id="search">
                    <div>
                        <label for="searchRadio">Search by</label><p style="margin-left: 50px;">
                            <input type="radio" name="searchRadio" value="activity" id="activity" checked>Fitness activity<br/>
                            <input type="radio" name="searchRadio" value="center" id="center">Fitness center<br/><br/></p>
                       <form class="searchform">
                           <input class="searchfield" type="text" name='searchkey' id='searchkey' placeholder="Search..."  />
                        <input class="searchbutton" type="button" value="Go" onclick="widgets.user.searchMe()"/>

                        
                        </form>  
                    </div>
                    <div id="search-result">
                        <a href = "#lightbox" class="light" onclick="">Hard</a>
                        <a href = "#lightbox" class="light" onclick=""> Coded</a>
                    </div>
                </div>

                <div id="advSearch" style="display: none">
                    <div>
                        <p class="underline_title">Type</p>
                        <table>
                            <tr id="search-service">


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
                <!--                </div>-->
            </div>

            <div id="preferences" style="display: none;min-height: 340px;">



                <div style="text-align: center"><a href = "#"  onclick="widgets.user.preferencesBilling(0)">Preferences</a> | <a href = "#"  onclick="widgets.user.preferencesBilling(1)">Billing</a></div>
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
                    <!--                    <div >
                                            <button onclick="widgets.user.update()" >Update</button>
                                        </div>  -->

                    <!--<a href="#">Change password</a>-->

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
        <div name="lightbox" id="lightbox" class="blue-box2">
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



                <div id="box-content" style="color: green;">
                    <div id="box-description" >Description</div>   
                    <div id="box-Schedule" style="display: none; " >Schedule</div>   
                    <div id="box-Rate" style="display: none ; " >Rate</div>   
                    <div id="box-Services" style="display: none;" >Services</div>   
                </div>

            </div>
            <div id="box-footer" style="color: blue;"><a href="#schedule-form" class="light">Add to my schedule</a></div>
        </div>

    </div>
    <div style="display: none;">
        <div name="schedule-form" id="schedule-form" class="blue-box2" style="color: green; width: 400px">
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
