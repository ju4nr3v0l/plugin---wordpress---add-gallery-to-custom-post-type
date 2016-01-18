/**
 * Js functions for custom post-type
 * @author Sebxx 
 * @package Medellín Vive La Música
 * @version 1.0
 **/
 jQuery(document).ready(function () {

    /*
     * General functions
     */

     jQuery("#mvlm-contact-check").click(function () {
        if (jQuery("#mvlm-contact").val() == 'yes') {
            jQuery("#mvlm-contact").val('no');
        } else {
            jQuery("#mvlm-contact").val('yes');
        }
    });

    /*
     * Timepicker
     */
     jQuery('.timepicker').timepicki();
    /*
     * Datepicker
     */
     jQuery(".datepicker").datepicker();

     /*
      * Uploader
      */
    //PDF
    jQuery('#upload-pdf').click(function (e) {

        e.preventDefault();
        frame = wp.media({
            title: 'Agregar nuevo PDF',
            frame: 'post',
            multiple: false,
            library: {type: 'pdf'},
            button: {text: 'Agregar PDF'},
        });

        frame.on('close', function (data) {
            var pdfURL = [];
            var pdfID = [];
            pdfs = frame.state().get('selection');
            pdfs.each(function (pdf) {

                pdfURL.push(pdf.attributes.url);
                pdfID.push(pdf.attributes.id);

            });
            jQuery("#boletin-pdfId").val(pdfID.join(","));
            jQuery("#boletin-pdf").val(pdfURL.join(","));
        });
        frame.open()
    });

    //Video m4v
    jQuery('#upload-video-m4v').click(function (e) {

        e.preventDefault();
        frame = wp.media({
            title: 'Agregar nuevo vídeo',
            frame: 'post',
            multiple: false,
            library: {type: 'video'},
            button: {text: 'Agregar vídeo'},
        });

        frame.on('close', function (data) {
            var videoURL = [];
            var videoID = [];
            videos = frame.state().get('selection');
            videos.each(function (video) {

                videoURL.push(video.attributes.url);
                videoID.push(video.attributes.id);

            });
            jQuery("#video-m4v_selfhostedID").val(videoID.join(","));
            jQuery("#videom4v_selfhosted").val(videoURL.join(","));
        });
        frame.open()
    });

    //Video ogv
    jQuery('#upload-video-ogv').click(function (e) {

        e.preventDefault();
        frame = wp.media({
            title: 'Agregar nuevo vídeo',
            frame: 'post',
            multiple: false,
            library: {type: 'video'},
            button: {text: 'Agregar vídeo'},
        });

        frame.on('close', function (data) {
            var videoURL = [];
            var videoID = [];
            videos = frame.state().get('selection');
            videos.each(function (video) {

                videoURL.push(video.attributes.url);
                videoID.push(video.attributes.id);

            });
            jQuery("#video-ogv_selfhostedID").val(videoID.join(","));
            jQuery("#videoogv_selfhosted").val(videoURL.join(","));
        });
        frame.open()
    });

    /* add gallery images*/

    jQuery('#add-images, #upload-images').click(function (e) {

        e.preventDefault();
        frame = wp.media({
            title: 'Añadir imágenes',
            frame: 'post',
            multiple: true,
            library: {type: 'image'},
            button: {text: 'Añadir imágenes'},
        });

        frame.on('close', function (data) {
            var imagesURL = [];
            var imagesID = [];
            var thumbnailurl = [];
            
            images = frame.state().get('selection');
            images.each(function (images) {

                imagesURL.push(images.attributes.url);
                imagesID.push(images.attributes.id);
                thumbnailurl.push(images.attributes.sizes.thumbnail.url);



            });
            if(jQuery("#slider_imagesIDs").val()==''){
                jQuery("#slider_imagesIDs").val(jQuery('#slider_imagesIDs').val() + imagesID.join(","));
                jQuery("#slider_images").val(jQuery('#slider_images').val()  + imagesURL.join(","));

                jQuery(thumbnailurl).each(function (index, value) {
                    jQuery(".galleryContainer").append('<li class="galeriatumb"><img img_id="' + imagesID[index] + '" src="' + value + '"><span id="borrar_imgGallery" class="dashicons dashicons-no">Borrar imagen</span><br /><input type="text" class="foto-text" name="foto-text-'+ imagesID[index] + '" placeholder="Ingrese pie de foto"></li>');
                });
            } else {
                jQuery("#slider_imagesIDs").val(jQuery('#slider_imagesIDs').val() + ',' +imagesID.join(","));
                jQuery("#slider_images").val(jQuery('#slider_images').val()  + ',' + imagesURL.join(","));

                jQuery(thumbnailurl).each(function (index, value) {
                    jQuery(".galleryContainer").append('<li class="galeriatumb"><img img_id="' + imagesID[index] + '" src="' + value + '"><span id="borrar_imgGallery" class="dashicons dashicons-no">Borrar imagen</span><br /><input type="text" name="foto-text-'+ imagesID[index] + '" class="foto-text" placeholder="Ingrese pie de foto"></li>');
                });
            }

            jQuery(".galleryContainer").show();

        });
frame.open()
});

jQuery('.dashicons-no').click(function (e) {
    var ids = jQuery("#slider_imagesIDs").val();
    var urls = jQuery("#slider_images").val();
    var this_id = jQuery(this).parent().find("img").attr("img_id");
    var this_src = jQuery(this).parent().find("img").attr("src");

    ids = ids.split(",");
    urls = urls.split(",");

    var position = ids.indexOf(this_id);

    ids.splice(position,1);
    urls.splice(position,1);

    jQuery("#slider_imagesIDs").val(ids);
    jQuery("#slider_images").val(urls);

    jQuery(this).parent().remove();
});            

});
