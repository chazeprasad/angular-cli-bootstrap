class ImageUploadComponent {
    constructor($scope, $timeout, $element){
        'ngInject'

        this.$scope = $scope;
        this.$timeout = $timeout;
        this.$element = $element;

        this.name = 'uploadImageCmp';

        this.maxFileSize = 5;
        this.image = null;

        this.url = 'http://www.seehom.es/upload-server/';
        this.progress = 0;

    }

    $onInit(){
    }

    onUploadButtonClick(e){
        e.stopPropagation();
        e.preventDefault();
        $(this.fileInput).trigger('click');
        if(e.target.type === 'file'){

        }
    }

    $postLink(e,a){
        this.cmpWrapper = this.$element.find('.image-upload-component-wrapper');
        this.cmp = this.$element.find('.image-upload-component');
        this.wrapper = this.$element.find('.wrapper');


        this.progressWrapper = this.$element.find('.file-progress');
        this.progressWrapper.css('display', 'none');

        this.cmpWrapper.css('width', this.cmpWidth + 'px');
        this.cmpWrapper.css('height', this.cmpHeight + 'px');

        this.cmp.css('width', this.cmpWidth + 'px');
        this.cmp.css('height', this.cmpHeight + 'px');

        this.uploadButtonWrapper = this.$element.find(this.name + this.$scope.$id + 'uploadButtonWrapper');


        var input = document.createElement('input');
        this.fileInput = input;
        input.setAttribute('type', 'file');
        input.setAttribute('multiple', false);
        input.setAttribute('accept', 'image/*');
        input.style.display = 'none';

        input.addEventListener('click',  (event) =>{
          $('.demo-droppable p').html(" ")
        });



        setTimeout( () => {
            let cid = '#' + this.name + this.$scope.$id + 'uploadButtonWrapper'
          window.document.querySelector(cid).appendChild(input);
          this.$scope.$apply();
          this.setup()
        },1000)




    }
    $onChanges(changes){
        // console.log('changes')
        // console.log(changes)

        if(changes.src && !changes.src.isFirstChange()) {
              this.initCroppie(changes.src.currentValue)
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
                    // console.log(percentCompleted)
                }
            this.$scope.$apply()

        }

        var loadHandler = (e) => {
            // Event listener for when the item completed uploading
            // console.log('Uploaded')

            this.$timeout(()=> {
                this.$scope.$apply(()=> {
                    this.progressWrapper.css('display', 'none');
                    // this.$scope.$apply()
                });
            }, 2000, true);


        }

        var completeHandler = (data, status) =>{
                this.file = data.files[0];
                this.src.url = this.file.url;
                this.initCroppie(this.file)
                this.$scope.$apply();
                // console.log(data)
                this.$timeout(()=>{
                    this.done(data.files[0]);
                },1000)
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

    reset(){
        if(this.image){
            this.image.croppie('destroy')
            this.image = null
        }
    }

    initCroppie(src){
        this.reset();
        if(src && src.url){
            if(this.image){
                this.image.croppie('destroy')
                this.image = null
            }
            var image = this.wrapper.croppie({
                viewport: { width: this.frameWidth, height: this.frameHeight, type: 'square' },
                // boundary: { width: 300, height: 300 },
                showZoomer: false
            });

            this.image = image;
            this.image.croppie('bind', {
                url: src.url
            }).then(function(){
                // console.log('jQuery bind complete');
            });

        }
    }

    setup(){

        this.fileInput.addEventListener('change', (event) =>{
            var file, name, reader, size, type, input, scope;
            this.reset();

            input = $(this.fileInput);
            if (event != null) {
              event.stopPropagation();
              event.preventDefault();

              var file = null;
              if (event.dataTransfer) {// file drag and drop
                file = event.dataTransfer.files[0] || null;
              }else if ($(input)[0].files) {// file upload
                file = $(input)[0].files[0] || null;
              }

              if (!file) {
                return;
              }

              name = file.name;
              type = file.type;
              size = file.size;
              reader = new FileReader();

              reader.onload = (evt) => {
                if (checkSize(size)) {
                    let imgData = evt.target.result;
                    // console.log('this.upload(file)')
                    this.upload(file);
                }
              };
              const maxFileSize = this.maxFileSize;
              var checkSize = (size) =>{
                var _ref;
                if (((_ref = maxFileSize) === (void 0) || _ref === '') || (size / 1024) / 1024 < maxFileSize) {
                  return true;
                } else {
                  alert('File must be smaller than ' + maxFileSize + ' MB');
                  return false;
                }
              }
              reader.readAsDataURL(file, 'UTF-8');

            }

        });
    }



}
let bindings =  {

        img : '=',
        file : '=',
        progress : '=',
        src : '<',
        done : '&',
        maxSize : '<',

        cmpWidth : '<',
        cmpHeight : '<',

        frameWidth : '<',
        frameHeight : '<',

        fileData : '=',
        imageData: '=',

        text: '@'


    };

let templateUrl = 'component/_image.upload.html';
let controller = ImageUploadComponent;

export default {
    bindings: bindings,
    templateUrl:templateUrl,
    controller: controller
};
