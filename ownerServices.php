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
                <li><a href="ownerServices.php" class="selected">Services</a></li>
                <li><a href="ownerAnalytics.php" >Analytics</a></li>
                <li><a href="ownerProfile.php" >Preferences</a></li>
            </ul>

        </div>
        <div class="clr" ></div>
        <div class="blue-box1">
            <div id="shedule" style="min-height: 360px;">
                <div id="all_service"></div>
                <div id="new_service"> <br/>
                    <label for="newServe" class="underline_title"> New Type  </label> <br/>
                    <input type="text" name="newServe" id="newServe" class="round" style="margin-top: 5px;margin-left: 10px;"/>
                    <div id="btn_add" class="buttons" onclick="widgets.gim.addType()" style="margin-top: 5px;margin-left: 10px;">ADD</div>
                </div>
<!--                <div id="key_service"> <br/>
                    <label for="key" class="underline_title"> Keywords  </label> <br/>
                    <input type="text" name="key" id="key" class="round" style="margin-top: 5px;margin-left: 10px;"/>
                    <div id="btn_search" class="buttons" onclick="widgets.gim.search()" style="margin-top: 5px;margin-left: 10px;"  >Search</div>
                    <div id="btn_save" class="buttons" onclick="widgets.gim.save()" style="margin-top: 5px;margin-left: 10px;float: right;">Save</div>

                </div>-->

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
