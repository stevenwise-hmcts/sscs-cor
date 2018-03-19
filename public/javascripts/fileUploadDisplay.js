/* global $ */
$(document).ready(function () {

    Dropzone.autoDiscover = false;
    $("#upload-widget").dropzone({
        paramName: Name,
        url: '/evidence-upload-interact',
        autoProcessQueue: false,
        uploadMultiple: true,
        parallelUploads: 100,
        maxFiles: 100,

        // The setting up of the dropzone
        init: function() {

            var files = 0;


            // If we have no files, we need an empty message
            this.on("removedfile", function(file) {

                files--;

                if (files <= 0) {
                    document.querySelector("#upload-documents").innerHTML = '<div class="c-uploads-item"><p class="c-uploads-empty">No files uploaded</p></div>';
                }

            }),

                this.on("addedfile", function(file) {

                    files++;

                    // If we have 1 file then we no longer need an empty message
                    if (files === 1) {
                        document.querySelector("#upload-documents").innerHTML = '';
                    }

                    // Create the remove button
                    var removeButton = Dropzone.createElement('<div class="c-uploads-item"><span class="c-uploads-item__filename">' + file.name + '</span><span class="c-uploads-item__action"><button class="c-uploads-button" aria-controls="upload-documents">Remove</button></span></div>');

                    // Get the element I want to add new elements to
                    var target = document.querySelector("#upload-documents");

                    // Capture the Dropzone instance as closure
                    var _this = this;

                    // Listen to the click event
                    removeButton.addEventListener("click", function(e) {

                        // Make sure the button click doesn't submit the form
                        e.preventDefault();
                        e.stopPropagation();

                        // Remove the file preview
                        _this.removeFile(file);

                        // Remove item
                        this.remove();

                    });

                    target.appendChild(removeButton);

                });

            var myDropzone = this;

            $("#buldUploadForm").submit(function (e) {
                e.preventDefault();
                e.stopPropagation();
                myDropzone.processQueue();
            });

            this.on("sendingmultiple", function(data, xhr, formData) {
                formData.append('describeTheEvidence', $('#describeTheEvidence').val());
                window.location.href = '/question-interacting'
            });

        }

    });

    function Name() {
        return "fileUpload";
    }
});
