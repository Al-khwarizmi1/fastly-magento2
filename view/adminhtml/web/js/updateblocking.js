define([
    "jquery",
    "resetAllMessages",
    'mage/template',
    'mage/translate'
], function ($, resetAllMessages) {
    return function (config) {
        let blockingSuccessBtnMsg = $('#fastly-update-blocking-success-button-msg');
        let blockingErrorBtnMsg = $('#fastly-update-blocking-error-button-msg');

        $(document).ready(function () {

            $('#fastly_update_blocking_button').on('click', function () {

                resetAllMessages();

                $.ajax({
                    type: "POST",
                    url: config.updateBlockingUrl,
                    showLoader: true,
                    data: {
                        'service_id': $('#system_full_page_cache_fastly_fastly_service_id').val(),
                        'api_key': $('#system_full_page_cache_fastly_fastly_api_key').val(),
                        'acls': $('#system_full_page_cache_fastly_fastly_blocking_block_by_acl').serializeArray(),
                        'countries': $('#system_full_page_cache_fastly_fastly_blocking_block_by_country').serializeArray()
                    },
                    cache: false,
                    success: function (response) {
                        if (response.status === false) {
                            return blockingErrorBtnMsg.text($.mage.__('Please make sure that blocking is enabled.')).show();
                        } else {
                            return blockingSuccessBtnMsg.text($.mage.__('Blocking snippet has been updated successfully.')).show();
                        }
                    },
                    error: function () {
                        return blockingErrorBtnMsg.text($.mage.__('An error occurred while processing your request. Please try again.')).show();
                    }
                });
            });
        });
    };
});