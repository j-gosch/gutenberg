/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import BlockRatings from '../block-ratings';
import DownloadableBlockIcon from '../downloadable-block-icon';

function DownloadableBlockHeader( {
	icon,
	title,
	rating,
	ratingCount,
	onClick,
} ) {
	return (
		<div className="block-directory-downloadable-block-header__row">
			<DownloadableBlockIcon icon={ icon } title={ title } />

			<div className="block-directory-downloadable-block-header__column">
				<span
					role="heading"
					className="block-directory-downloadable-block-header__title"
				>
					{ title }
				</span>
				<BlockRatings rating={ rating } ratingCount={ ratingCount } />
			</div>
			<Button
				isSecondary
				onClick={ ( event ) => {
					event.preventDefault();
					onClick();
				} }
			>
				{ __( 'Add block' ) }
			</Button>
		</div>
	);
}

export default DownloadableBlockHeader;
