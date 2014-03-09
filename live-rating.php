<?php
/**
 * Live Rating
 *
 * A score voting plugin for wordpress that allows editors and readers to rate posts. The results are updated live, meaning as soon as a new vote is cast, without the need to refresh the webpage.
 *
 * @package   Live_Rating
 * @author    Stefan Ghiata <stefan.ghiata@gmail.com>
 * @license   GPL-2.0+
 * @link      http://live-rating.ghiata.com
 * @copyright 2014 Stefan Ghiata
 *
 * @wordpress-plugin
 * Plugin Name:       Live Rating
 * Plugin URI:        http://live-rating.ghiata.com
 * Description:       A score voting plugin for wordpress that allows editors and readers to rate posts. The results are updated live, meaning as soon as a new vote is cast, without the need to refresh the webpage.
 * Version:           0.0.1
 * Author:            Stefan Ghiata
 * Author URI:        http://www.ghiata.com
 * Text Domain:       live-rating
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Domain Path:       /languages
 * GitHub Plugin URI: 
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/*----------------------------------------------------------------------------*
 * Public-Facing Functionality
 *----------------------------------------------------------------------------*/

require_once( plugin_dir_path( __FILE__ ) . 'public/class-live-rating.php' );

/*
 * Register hooks that are fired when the plugin is activated or deactivated.
 * When the plugin is deleted, the uninstall.php file is loaded.
 */
register_activation_hook( __FILE__, array( 'Live_Rating', 'activate' ) );
register_deactivation_hook( __FILE__, array( 'Live_Rating', 'deactivate' ) );

add_action( 'plugins_loaded', array( 'Live_Rating', 'get_instance' ) );

/*----------------------------------------------------------------------------*
 * Dashboard and Administrative Functionality
 *----------------------------------------------------------------------------*/

/*
 * @TODO:
 *
 * If you want to include Ajax within the dashboard, change the following
 * conditional to:
 *
 * if ( is_admin() ) {
 *   ...
 * }
 *
 * The code below is intended to to give the lightest footprint possible.
 */
if ( is_admin() && ( ! defined( 'DOING_AJAX' ) || ! DOING_AJAX ) ) {

	require_once( plugin_dir_path( __FILE__ ) . 'admin/class-live-rating-admin.php' );
	add_action( 'plugins_loaded', array( 'Live_Rating_Admin', 'get_instance' ) );

}
