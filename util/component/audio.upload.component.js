class AudioUploadComponent {
    constructor($scope, $timeout, $element){
        'ngInject'

        this.$scope = $scope;
        this.$timeout = $timeout;
        this.$element = $element;

        this.maxFileSize = 5;
        this.image = null;

        this.url = 'http://www.seehom.es/upload-server/';
        this.progress = 0;

    }

    $onInit(){
        console.log('onInit: Audio Upload')

    }

    onUploadButtonClick(e){
        console.log('onUploadButtonClick')
        e.stopPropagation();
        e.preventDefault();
        $(this.input).trigger('click');

        if(e.target.type === 'file'){

        }
    }


    upload(file, onComplete){
        var form = new FormData();
        this.progress = 0;
        this.$scope.$apply()
        this.progressWrapper.css('display', 'block');

        // Additional POST variables required by the API script
        form.append('files[]', file);
        form.append('overwrite', true);

        var progressHandler = (e) => {
            // Event listener for while the item is uploading
                var percentCompleted = Math.round(e.loaded / e.total * 100);
                if (percentCompleted < 1) {
                    this.progress = 0;
                    // item.uploadStatus = 'Uploading...';
                } else if (percentCompleted == 100) {
                    this.progress =100;
                    // item.uploadStatus = 'Saving...';
                } else {
                    // item.uploadStatus = percentCompleted + '%';
                    this.progress = percentCompleted;
                    console.log(percentCompleted)
                }
            this.$scope.$apply()

        }

        var loadHandler = (e) => {
            // Event listener for when the item completed uploading
            console.log('Uploaded')

            // item.uploadStatus = 'Uploaded!'
            this.$timeout(()=> {
                this.$scope.$apply(()=> {
                    console.log('Uploaded')
                    this.progressWrapper.css('display', 'none');
                    // this.$scope.$apply()
                });
            }, 2000, true);


        }

        var completeHandler = (data, status) =>{
                this.file = data.files[0];
                this.$scope.$apply();
                console.log(data)
                this.$timeout(()=>{

                    this.done(data.files[0]);
                },1000)


                // this.$scope.$apply()


        }

        $.ajax({
                // headers: { 'Content-type': 'application/x-www-form-urlencoded' },
                url: this.url,  //Server script to process data
                type: 'POST',
                cache: false,
                dataType: 'json',
                // Form data
                data: form,
                xhr: () => {  // Custom XMLHttpRequest
                    var myXhr = $.ajaxSettings.xhr();
                    if(myXhr.upload){ // Check if upload property exists
                        myXhr.upload.addEventListener('progress',progressHandler, false); // For handling the progress of the upload
                        myXhr.upload.addEventListener('load',loadHandler, false); // Event listener for when the item completed uploading
                    }
                    return myXhr;
                },
                xhrFields: {
                      withCredentials: false
                },
                //Ajax events
                // beforeSend: beforeSendHandler,
                success: completeHandler,
                error: err => {},

                //Options to tell jQuery not to process data or worry about content-type.
                cache: false,
                contentType: false,
                processData: false
            });
    }


    $postLink(e,a){


        this.wrapper = this.$element.find('.wrapper');
        console.log(this.wrapper)

        var input = document.createElement('input');
        this.input = input;
        input.setAttribute('type', 'file');
        input.setAttribute('multiple', false);
        input.setAttribute('accept', 'audio/mp3');
        input.style.display = 'none';
        input.addEventListener('change', (event) => {
            var file, name, reader, size, type;
            $(".demo-droppable").removeClass('dragover');
            if (event != null) {
                event.stopPropagation();
                event.preventDefault();

                var file = null;
                if (event.dataTransfer) {
                    // file drag and drop
                    file = event.dataTransfer.files[0] || null;
                }else if ($(input)[0].files) {
                    // file upload
                    file = $(input)[0].files[0] || null;
                }
                if (!file) {
                    return;
                }
                this.upload(file);
                // this.uploadFileToUrl(file);
            }
        });


        input.addEventListener('click', function (event) {
          $('.demo-droppable p').html(" ")
        });
        setTimeout( () => {
          window.document.querySelector('#audioUploadCmpWrapper').appendChild(input);
          this.$scope.$apply();
        },1000)




        this.progressWrapper = this.$element.find('.file-progress');
        // this.wrapper = this.$element.find('.wrapper');
        // this.file = this.$element.find('.file');

        // this.progressWrapper.css('width', 42 + 'px');
        // this.progressWrapper.css('height', 42 + 'px');
        // this.progressWrapper.css('position', 'absolute');
        // this.progressWrapper.css('left', '-5px');
        // this.progressWrapper.css('top', '-1px');
        //
        this.progressWrapper.css('display', 'none');

        // this.cmp.css('width', this.cmpWidth + 'px');
        // this.cmp.css('height', this.cmpHeight + 'px');



        // this.setup();
    }


}
let bindings =  {
    progress: '=',
    file: '=',
    done: '&'


    };

let templateUrl = 'component/_audio.upload.html';
let controller = AudioUploadComponent;

export default {
    bindings: bindings,
    templateUrl:templateUrl,
    controller: controller
};
