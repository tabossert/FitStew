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
            <li><a href="owner.php" >Schedule</a></li>
            <li><a href="#" >Profile</a></li>
            <li><a href="ownerServices.php" >Services</a></li>
            <li><a href="ownerAnalytics.php" >Analytics</a></li>
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
