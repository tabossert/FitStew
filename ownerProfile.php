<?php
//Set title
$title = "ZuneFit Gym Panel";
?>
<!-- Header Start -->
<?php include 'html/header.php'; ?>
<!-- Header End -->

<input type="hidden" name="token" id="token" value="<?php echo $_SESSION['token']; ?>"/>
<input type="hidden" name="gid" id="gid" value="<?php echo $_SESSION['gid']; ?>" />
<input type="hidden" name="gname" id="gname" value="<?php echo $_SESSION['gname']; ?>"/>
<div class="middle-container">
    <div class="inner-left-part">

        <div >
            <ul id="inner-nav" style="padding-left: 14px;">
                <li><a href = "#lightbox" class="light" >Profile</a></li>
                <li><a href="owner.php" >Schedule</a></li>
                <li><a href="ownerServices.php" >Services</a></li>
                <li><a href="ownerAnalytics.php" >Analytics</a></li>
                <li><a href="ownerProfile.php" class="selected">Preferences</a></li>
            </ul>

        </div>
        <div class="clr" ></div>
        <div class="blue-box1">
            <div id="shedule" style="min-height: 360px;">
               
                <span class="underline_title" >Billing address</span>
                <table class="pref">
                    <tr><td>
                            <label for="pref_name" class="name" >  Gym&nbsp;Name  </label></td><td>:</td><td>
                            <input type="text" name="pref_name" id="pref_name" class="transparent" style=" width: 400px;" readonly="readonly"/>
                            <label for="pref_name" class="error" generated="true"></label></td></tr>



                    <tr><td>
                            <label for="pref_address" class="address" > Address  </label></td><td>:</td><td>
                            <input type="text" name="pref_address" id="pref_address" class="transparent" style=" width: 400px;"  readonly="readonly"/> 
                            <label for="pref_address" class="error" generated="true"></label></td></tr>
                    <tr><td>
                            <label for="pref_city"  > City  </label></td><td>:</td><td>
                            <input type="text" name="pref_city" id="pref_city" class="transparent" style=" width: 400px;" readonly="readonly"/> 
                            <label for="pref_city" class="error" generated="true"></label></td></tr>
                    <tr><td>
                            <label for="pref_state"  > State  </label></td><td>:</td><td>
                            <input type="text" name="pref_state" id="pref_state" class="transparent" style=" width: 400px;" readonly="readonly"/> 
                            <label for="pref_state" class="error" generated="true"></label></td></tr>
                    <tr><td>
                            <label for="pref_zip"  > Zip Code  </label></td><td>:</td><td>
                            <input type="text" name="pref_zip" id="pref_zip" class="transparent" style=" width: 400px;" readonly="readonly"/> 
                            <label for="pref_zip" class="error" generated="true"></label></td></tr>



                </table>
                <div>
                    <span class="underline_title" >Disbursement Method</span><br/>
                    <input type="checkbox" checked="" id="monthly" style="margin-left: 20px;margin-top: 5px;"/><label for="monthly" style="margin-left: 10px;">Monthly check</label><br/>
                    <input type="checkbox" checked="" id="reach" style="margin-left: 20px;margin-top: 5px;"/><label for="reach" style="margin-left: 10px;">When the amount reaches</label>
                    <div id="slider-range-min"></div>
                    <br/>
                    <p>
                        <input type="text" class="style_text" id="amounts" name="amounts" readonly style="background: none;border: none;margin-left: 30px; font-size: 0.8em;"/>

                    </p>
                    <br/>
                    <div style="float: right;" class="buttons" id="disbursementbtn" onclick="widgets.gim.disbursement();" >Save</div>
                </div>
                <div>
                    <span class="underline_title" >Payment Method</span><br/>
                    <input type="checkbox" checked="" id="method" style="margin-left: 20px;margin-top: 5px;"/><label for="method" style="margin-left: 10px;">Check</label>
                </div>
            </div>
        </div>

    </div>
    <div style="display: none;">

         <?php  include('profile.php'); ?>

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
