<?php

/**
 * Custom metaboxes post-type Gallery
 * Creates the custom metaboxes for the post-type gallery
 * @author @Sebxx at The LM Team
 * @package Medellín Vive La Música
 * @version 1.0
 * */

/*
 * Add css style
 */
function admin_styles() {
	wp_register_style( 'admin_stylesheet', plugins_url( '/css/style.css', __FILE__ ) );
	wp_enqueue_style( 'admin_stylesheet' );	
}
add_action( 'admin_enqueue_scripts', 'admin_styles' );
/*
 * Add the galleries metaboxes
 */
function lm_gallery_metaboxes( $post ) {
	add_meta_box( 'lm_gallery_images', 'Imágenes', 'lm_gallery_images', 'mvlm_gallery', 'normal', 'high' );
	
}

add_action( 'add_meta_boxes_mvlm_gallery', 'lm_gallery_metaboxes' );

/*
 * HTML output for metaboxes
 */

//Images
function lm_gallery_images() {
	global $post;
	?>
	<input type="hidden" name="gallerymeta_noncename_images" id="gallerymeta_noncename" value="<?php echo wp_create_nonce( plugin_basename( __FILE__ ) ); ?>">
	<?php
	$slider = get_post_meta( $post->ID, 'mvlm-images', true );
	$sliderIDs = get_post_meta( $post->ID, 'mvlm-images-ids', true );
	if ($sliderIDs == ''){
		$upload = "inline-block;";
		$add = "none;";
		$sliderIDs = explode(",", $sliderIDs, -1);
	} else {
		$upload = "none;";
		$add = "inline-block;";
	}


	if ( !is_array($sliderIDs) )
		$sliderIDs = explode(",", $sliderIDs);
	?>
	<label for="mvlm-slider">Por favor, seleccione las imágenes que desee para la galeria.<p> Para borrar una imagen por favor publique primero la galeria.</p></label><br />
	<input type="hidden" id="slider_images" name="mvlm-images" value="<?php echo implode( ",", (array) $slider ); ?>" placeholder="Subir imágenes" readonly>
	<input type="hidden" id="slider_imagesIDs" name="mvlm-images-ids" value="<?php echo implode( ',', (array) $sliderIDs ); ?>">

	<input type="button" style="display:<?php echo $upload; ?>" name="upload-images" id="upload-images" class="button-secondary" value="Subir imágenes">
	<input type="button" style="display:<?php echo $add; ?>" name="add-images" id="add-images" class="button-secondary" value="Añadir imágenes">
	<ul class="galleryContainer" style="display:<?php echo $add; ?>">
	
	<?php
	
	if ( count($sliderIDs) > 0 ) {
		for ($i = 0; $i < count($sliderIDs); $i++){
			
			$thumb = wp_get_attachment_image_src($sliderIDs[$i], 'thumbnail');
			$pie = get_post_meta($post->ID,'foto-text-'.$sliderIDs[$i],true);
			
			echo '<li class="galeriatumb"><img img_id="' . $sliderIDs[$i] . '" src="' . $thumb[0] . '"/><span id="borrar_imgGallery" class="dashicons dashicons-no">Borrar imagen</span><br /><input type="text" name="foto-text-' . $sliderIDs[$i] . '" class="foto-text" placeholder="Ingrese pie de foto" value="'. $pie .'"></li>';  	
		}
	}
	
	?>		
	</ul> 
	<?php

}
 

 

/*
 * Save the metabox data
 */

function lm_save_galleries_meta( $post_id, $post ) {

	if ( wp_verify_nonce( $_POST['gallerymeta_noncename_images'], plugin_basename( __FILE__ ) ) )
		return $post->ID;


	if ( !current_user_can( 'edit_post', $post->ID ) )
		return $post->ID;

	$galleries_meta['mvlm-images'] = $_POST['mvlm-images'];
	$galleries_meta['mvlm-images-ids'] = $_POST['mvlm-images-ids'];
	
	$idsArray = explode(",", $galleries_meta['mvlm-images-ids']);
	for ( $i = 0; $i < count($idsArray); $i++ ) {
		if ( isset($_POST['foto-text-'. $idsArray[$i]] ) && $_POST['foto-text-' . $idsArray[$i]] != '' ) {
			$galleries_meta['foto-text-' . $idsArray[$i] ] = $_POST['foto-text-' . $idsArray[$i]];
		}
	}
	

	foreach ( $galleries_meta as $key => $value ) {
		if ( $post->post_type == 'revision' )
			return;
		$value = implode( ",", (array) $value );
		if ( get_post_meta( $post->ID, $key, false ) )
			update_post_meta( $post->ID, $key, $value );
		else
			add_post_meta( $post->ID, $key, $value );
		if ( !$value )
			delete_post_meta( $post->ID, $key );
	}
}

add_action( 'save_post', 'lm_save_galleries_meta', 1, 2 );
