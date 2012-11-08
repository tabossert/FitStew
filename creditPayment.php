<?php



?>
 <div >
                        <form action="payment/processor.php" method="POST">
                            <fieldset>
                                <input name="redirect_url" type="hidden" value="" />
                                <input name="merchant_key" type="hidden" value="dbb9284e8820d495f3833e50" />

                                <!-- Before populating the ‘custom’ parameter, remember to escape reserved characters
                                     like <, > and & into their safe counterparts like &lt;, &gt; and &amp; -->
                                <input name="custom" type="hidden" value="Any value you want us to save with this payment method" />

                                <label for="credit_card_first_name">First name</label>
                                <input id="credit_card_first_name" name="first_name" type="text" />

                                <label for="credit_card_last_name">Last name</label>
                                <input id="credit_card_last_name" name="last_name" type="text" />

                                <label for="credit_card_address_1">Address 1</label>
                                <input id="credit_card_address_1" name="address_1" type="text" />

                                <label for="credit_card_address_2">Address 2</label>
                                <input id="credit_card_address_2" name="address_2" type="text" />

                                <label for="credit_card_city">City</label>
                                <input id="credit_card_city" name="city" type="text" />

                                <label for="credit_card_state">State</label>
                                <input id="credit_card_state" name="state" type="text" />

                                <label for="credit_card_zip">Zip</label>
                                <input id="credit_card_zip" name="zip" type="text" />

                                <label for="credit_card_card_number">Card Number</label>
                                <input id="credit_card_card_number" name="card_number" type="text" />

                                <label for="credit_card_cvv">Security Code</label>
                                <input id="credit_card_cvv" name="cvv" type="text" />

                                <label for="credit_card_month">Expires on</label>
                                <input id="credit_card_month" name="expiry_month" type="text" />
                                <input id="credit_card_year" name="expiry_year" type="text" />

                                <button type='submit'>Submit Payment</button>
                            </fieldset>
                        </form>

                    </div>

