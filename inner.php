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
                            <button class="buttons" onclick="widgets.user.advancedSearch();" >Search</button>
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
                                <label for="firstName" class="firstName" >  First&nbsp;Name  </label></td><td>:</td><td>
                                <input type="text" name="firstName" id="firstName" class="transparent" style=" width: 400px;"/>
                                <label for="firstName" class="error" generated="true"></label></td></tr>
                        <tr><td>
                                <label for="lastName" class="lastName" >  Last&nbsp;Name  </label></td><td>:</td><td>
                                <input type="text" name="lastName" id="lastName" class="transparent" style=" width: 400px;"/> 
                                <label for="lastName" class="error" generated="true"></label></td></tr>
                        <tr><td>
                                <label for="email" class="email" >  Email  </label></td><td>:</td><td>
                                <input type="text" name="email" id="email" class="transparent" style=" width: 400px;"/>
                                <label for="email" class="error" generated="true"></label></td></tr>                        

                        <tr><td>
                                <label for="address" class="address" > Address  </label></td><td>:</td><td>
                                <input type="text" name="address" id="address" class="transparent" style=" width: 400px;"/> 
                                <label for="address" class="error" generated="true"></label></td></tr>

                    </table>


                </div>
                <div id="billing" style="display: none;">
                    <div >
                        <form action="https://api.samurai.feefighters.com/v1/payment_methods" method="POST">
                            <fieldset>
                                <input name="redirect_url" type="hidden" value="http://localhost/frontend/inner.php" />
                                <input name="merchant_key" type="hidden" value="dbb9284e8820d495f3833e50" />

                                <!-- Before populating the ‘custom’ parameter, remember to escape reserved characters
                                     like <, > and & into their safe counterparts like &lt;, &gt; and &amp; -->
                                <input name="custom" type="hidden" value="Any value you want us to save with this payment method" />

                                <label for="credit_card_first_name">First name</label>
                                <input id="credit_card_first_name" name="credit_card[first_name]" type="text" />

                                <label for="credit_card_last_name">Last name</label>
                                <input id="credit_card_last_name" name="credit_card[last_name]" type="text" />

                                <label for="credit_card_address_1">Address 1</label>
                                <input id="credit_card_address_1" name="credit_card[address_1]" type="text" />

                                <label for="credit_card_address_2">Address 2</label>
                                <input id="credit_card_address_2" name="credit_card[address_2]" type="text" />

                                <label for="credit_card_city">City</label>
                                <input id="credit_card_city" name="credit_card[city]" type="text" />

                                <label for="credit_card_state">State</label>
                                <input id="credit_card_state" name="credit_card[state]" type="text" />

                                <label for="credit_card_zip">Zip</label>
                                <input id="credit_card_zip" name="credit_card[zip]" type="text" />

                                <label for="credit_card_card_number">Card Number</label>
                                <input id="credit_card_card_number" name="credit_card[card_number]" type="text" />

                                <label for="credit_card_cvv">Security Code</label>
                                <input id="credit_card_cvv" name="credit_card[cvv]" type="text" />

                                <label for="credit_card_month">Expires on</label>
                                <input id="credit_card_month" name="credit_card[expiry_month]" type="text" />
                                <input id="credit_card_year" name="credit_card[expiry_year]" type="text" />

                                <button type='submit'>Submit Payment</button>
                            </fieldset>
                        </form>

                    </div>
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
            <div id="box-header" >
                <table class="pref2">
                    <tr><td>
                            <label for="g_name" class="labels"> Gym&nbsp;Name  </label> 
                        </td><td>
                            <input type="text" name="g_name" id="g_name" class="transparent"/>
                        </td>  </tr>  
                    <tr> <td>
                            <label for="g_rate" class="labels"> Rate  </label>
                        </td> <td>
                            <input type="text" name="g_rate" id="g_rate" class="transparent"/>
                        </td>  
                    </tr>
                </table>
            </div>
            <div>
                <div class = "my-box2" >
                    <p>
                    <ul class = "toplink">
                        <li><a href = "#" onclick="widgets.user.loadBox(0)">Description</a></li>
                        <li><a href = "#" onclick="widgets.user.loadBox(1)">Schedule</a></li>

                        <li><a href = "#" onclick="widgets.user.loadBox(2)">Services</a></li>
                    </ul>
                    </p>
                </div>



                <div id="divexample1" style="height: 290px;float: left;width: 390px;overflow-x: hidden;">

                    <div id="box-description" >
                        <table class="pref">

                            <tr><td>
                                    <label for="paddress"  >  Address  </label></td><td>:</td><td>
                                    <input type="text" name="paddress" id="paddress" class="transparent"/> 
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
                                    <label for="zipcode" > Zip&nbsp;Code  </label></td><td>:</td><td>
                                    <input type="number" name="zipcode" id="zipcode" class="transparent"/>
                                </td></tr>
                            <tr><td>
                                    <label for="phone"  >  Phone  </label></td><td>:</td><td>
                                    <input type="text" name="phone" id="phone" class="transparent"/> 
                                </td></tr>
                            <tr><td>
                                    <label for="pemail"  >  email  </label></td><td>:</td><td>
                                    <input type="email" name="pemail" id="pemail" class="transparent"/>
                                </td></tr>                        

                            <tr><td>
                                    <label for="contact"  > Contact  </label></td><td>:</td><td>
                                    <input type="text" name="contact" id="contact" class="transparent"/> 
                                </td></tr>

                        </table>
                    </div>   
                    <div id="box-Schedule" style="display: none; " >

                    </div>   

                    <div id="box-Services" style="display: none;" >

                    </div>   
                </div>

            </div>
            <div id="box-footer" style="color: #565D60; clear: both; text-align: center;" ><a href="#schedule-form" class="light">Add to my schedule</a></div>
        </div>

    </div>
    <div style="display: none;">
        <div name="schedule-form" id="schedule-form" class="blue-box2" style="color: green; width: 400px; height: 400px;">
            <div >
                <label for="time">Times</label>
                <div class='styled-select'>
                    <select name="time">
                        <option value="0" selected>Times</option>
                        <option value="1">one</option>
                        <option value="2">two</option>
                        <option value="3">three</option>
                    </select>
                </div>
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
                <button class="buttons"  >Submit</button>
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
