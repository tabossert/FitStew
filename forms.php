<?php
/* 
 * This file contains the HTML that needs to crate fancybox forms 
 */
?>

<div id="container" >    
    <div class="animate form" style="display: none;">
        <div id="loginError"  style="display: none;">sdsd</div>
        <form  action="mysuperscript.php" autocomplete="on" name="frmOwnersLogin" id="frmOwnersLogin" class="wrapper"> 
            <div class="innerForm" style="width:300px;">
                <h1>Sign-in</h1> 
                <p> 
                    <label for="username" class="uname"> Username </label>
                    <input id="username" name="username" class="required" required="required" type="text" placeholder="myusername or mymail@mail.com"/>
                    <label for="username" class="error" generated="true"></label>
                </p>
                <p id="msg">
                    <label class="msg"></label>
                </p>
                <p> 
                    <label for="password" class="youpasswd"> Password </label>
                    <input id="password" name="password" class="required" required="required" type="password" placeholder="eg. X8df!90EO" /> 
                    <label for="password" class="error" generated="true"></label>
                </p>
                <p class="keeplogin"> 
                    <input type="checkbox" name="loginkeeping" id="loginkeeping" value="loginkeeping" /> 
                    <label for="loginkeeping">Keep me logged in</label>
                </p>
                <p class="login button"> 
                  <input type="button" value="Login" class="btnsub" onclick="widgets.login()" /> 
                </p>
            </div>
        </form>
    </div>
</div>
