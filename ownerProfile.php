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


            <div id="Servicebox" style="display: none">
                <div class="blue-box1">

                    <div id="service">
                        <div>
                            <p class="underline_title">Type</p>
                            <table>
                                <tr>
                                    <td><input type="checkbox" id="boxing" ></td><td>Boxing</td>                      
                                    <td><input type="checkbox" id="cycling"></td> <td>Cycling</td>
                                    <td><input type="checkbox" id="cycling"></td> <td>Etc</td>
                                </tr>
                            </table>
                            <br/>
                            <p class="underline_title">New Type</p>

                            <input type="text" name="newType" id="newType" placeholder="Type"/> &nbsp; <button onclick="widgets.gim.addType();"> add </button>

                            <br/>
                            <p class="underline_title">Keywords</p>
                            <input type="text" name="keywords" id="keywords" placeholder="Keywords"/>

                            <button onclick="widgets.gim.Search();" >Search</button>
                        </div>
                    </div>
                    <div id="keyword-result"></div>
                </div>
            </div>

            <div id="analytic" style="display: none">
                <div class="blue-box1">

                    <div class="analytic-box" >
                        <h1>Quick Stats</h1>
                        <ul class="item-link">                
                        </ul>
                    </div>
                </div>
            </div>

        </div>

    </div>

    <div class="tabs">
        <ul class="tabs-link">
            <li><a href="#" >Profile</a></li>
            <li><a href="#" >Services</a></li>
            <li><a href="#" >Analytics</a></li>
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
