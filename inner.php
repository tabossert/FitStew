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
                        <tr><td>
                                <label for="city" class="address" > City  </label></td><td>:</td><td>
                                <input type="text" name="city" id="city" class="transparent" style=" width: 400px;"/> 
                                <label for="city" class="error" generated="true"></label></td></tr>
                        <tr><td>
                                <label for="state" class="address" > State  </label></td><td>:</td><td>
                                <input type="text" name="address" id="address" class="transparent" style=" width: 400px;"/> 
                                <label for="address" class="error" generated="true"></label></td></tr>
                        <tr><td>
                                <label for="address" class="address" > Zip Code  </label></td><td>:</td><td>
                                <input type="text" name="address" id="address" class="transparent" style=" width: 400px;"/> 
                                <label for="address" class="error" generated="true"></label></td></tr>
                        

                    </table>


                </div>
                <div id="billing" style="display: none;">
                    <div >
                        <form action="" method="POST">
                            <fieldset>

                                <input name="redirect_url" type="hidden" value="" />
                                <input name="merchant_key" type="hidden" value="dbb9284e8820d495f3833e50" />

                                <!-- Before populating the ‘custom’ parameter, remember to escape reserved characters
                                     like <, > and & into their safe counterparts like &lt;, &gt; and &amp; -->
                                <input name="custom" type="hidden" value="Any value you want us to save with this payment method" />



                                <table style="border-collapse: separate;border-spacing: 0px 10px; width: 280px;float: left;clear: left;">
                                    <tr style="padding-bottom: 5px;"><td>
                                            <label for="first_name" class="bil_label">First name</label></td><td>
                                            <input id="first_name" name="first_name" type="text" class="bil_text"/></td>
                                    </tr>
                                    <tr><td>
                                            <label for="last_name" class="bil_label">Last name</label></td><td>
                                            <input id="last_name" name="last_name" type="text" class="bil_text"/></td>
                                    </tr>
                                    <tr><td>
                                            <label for="address_1" class="bil_label">Address 1</label></td><td>
                                            <input id="address_1" name="address_1" type="text"  class="bil_text"/></td>
                                    </tr>
                                    <tr><td>
                                            <label for="address_2" class="bil_label">Address 2</label></td><td>
                                            <input id="address_2" name="address_2" type="text"  class="bil_text"/></td>
                                    </tr>
                                    <tr><td>
                                            <label for="city" class="bil_label">City</label></td><td>
                                            <input id="city" name="city" type="text"  class="bil_text"/></td></tr>

                                    <tr><td><label for="state" class="bil_label">State</label></td><td>
                                            <input id="state" name="state" type="text"  class="bil_text"/></td></tr>
                                    <tr><td>
                                            <label for="zip" class="bil_label">Zip</label></td><td>
                                            <input id="zip" name="zip" type="text"  class="bil_text"/></td></tr>


                                </table>

                                <div class="less">Refill automatically&nbsp;&nbsp;&nbsp;&nbsp;
                                    <a href="javascript:void(0);" onclick="widgets.user.creditInfo();" >edit</a>|
                                    <a href="javascript:void(0);" onclick="widgets.user.update_refill();" >done</a>
                                </div>

                                <div id="hide_refil" style="display: none;">
                                    <table style="border-collapse: separate;border-spacing: 0px 10px; width: 280px;float: left;clear: left;">
                                        <tr style="padding-bottom: 5px;"><td>
                                                <input id="refil" name="refil" type="checkbox" />
                                                <label for="refil">Refil Automatically</label></td>
                                        </tr>
                                        <tr><td>
                                                <select id="when">
                                                    <option value="0">When to Refill</option>
                                                    <option value="1">1st of month</option>
                                                    <option value="15">15th of month</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr><td>
                                                <input type="text" id="auto_amount" placeholder="Refill amount" class="round"/>
                                            </td>
                                        </tr>


                                    </table>
                                </div>

                                <table style="border-collapse: separate;border-spacing: 0px 10px; width: 310px;"><tr><td>
                                            <label for="card_number" class="bil_label">Card Number</label></td><td>
                                            <input id="card_number" name="card_number" type="text"  class="bil_text"/></td></tr>
                                    <tr><td>
                                            <label for="cvv" class="bil_label">Security Code</label></td><td>
                                            <input id="cvv" name="cvv" type="text"  class="bil_text"/></td></tr>
                                    <tr> <td>
                                            <label for="credit_card_month" class="bil_label">Expires on month</label></td><td >
                                            <input id="expiry_month" class="bil_text" name="expiry_month" type="text" placeholder="05" /></td></tr >
                                    <tr><td>    <label for="credit_card_year" class="bil_label">Expires on year</label></td><td >   
                                            <input id="expiry_year" class="bil_text" name="expiry_year" type="text" placeholder="2012" width="4" /></td></tr>
                                    <tr> <td>
                                            <label for="amount" class="bil_label">Amount</label></td><td>
                                            <input id="amount" name="amount" type="text"  class="bil_text"/></td></tr>

                                </table>

                                <img src="images/CreditCardLogos.jpg" style="clear: right;  padding-left: 110px; "/>

                                <button class="buttons" type='button' style="clear: right; margin-top: 10px;margin-left: 130px;" onclick="widgets.user.payment();">Submit Payment</button>
                                <div id="message">Message</div>

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
                        </td><td><td>:<td>
                            <input type="text" name="g_name" id="g_name" class="transparent"/>
                        </td>  </tr>  
                    <tr> <td>
                            <label for="g_rate" class="labels"> Rate  </label>
                        </td> <td><td>:<td>
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
                                    <label for="g_address"  >  Address  </label></td><td>:</td><td>
                                    <input type="text" name="g_address" id="g_address" class="transparent"/> 
                                </td></tr>
                            <tr><td>
                                    <label for="g_city"  >  City  </label></td><td>:</td><td>
                                    <input type="text" name="g_city" id="g_city" class="transparent"/>
                                </td></tr>                        

                            <tr><td>
                                    <label for="g_state"  > State  </label></td><td>:</td><td>
                                    <input type="text" name="g_state" id="g_state" class="transparent"/> 
                                </td></tr>
                            <tr><td>
                                    <label for="g_zipcode" > Zip&nbsp;Code  </label></td><td>:</td><td>
                                    <input type="number" name="g_zipcode" id="g_zipcode" class="transparent"/>
                                </td></tr>
                            <tr><td>
                                    <label for="g_phone"  >  Phone  </label></td><td>:</td><td>
                                    <input type="text" name="g_phone" id="g_phone" class="transparent"/> 
                                </td></tr>
                            <tr><td>
                                    <label for="g_email"  >  email  </label></td><td>:</td><td>
                                    <input type="email" name="g_email" id="g_email" class="transparent"/>
                                </td></tr>                        

                            <tr><td>
                                    <label for="g_contact"  > Contact  </label></td><td>:</td><td>
                                    <input type="text" name="g_contact" id="g_contact" class="transparent"/> 
                                </td></tr>

                        </table>
                    </div>   
                    <div id="box-Schedule" style="display: none; " >

                    </div>   

                    <div id="box-Services" style="display: none;" >

                    </div>   
                </div>

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
