/**
 * External dependencies
 */
import { noop } from 'lodash';

/**
 * WordPress dependencies
 */
import { getBlockMenuDefaultClassName } from '@wordpress/blocks';
import { withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import DownloadableBlockListItem from '../downloadable-block-list-item';

function DownloadableBlocksList( {
	items,
	onHover = noop,
	children,
	downloadAndInstallBlock,
} ) {
	return (
		/*
		 * Disable reason: The `list` ARIA role is redundant but
		 * Safari+VoiceOver won't announce the list otherwise.
		 */
		/* eslint-disable jsx-a11y/no-redundant-roles */
		<ul role="list" className="block-directory-downloadable-blocks-list">
			{ items &&
				items.map( ( item ) => (
					<DownloadableBlockListItem
						key={ item.id }
						className={ getBlockMenuDefaultClassName( item.id ) }
						icons={ item.icons }
						onClick={ () => {
							downloadAndInstallBlock( item );
							onHover( null );
						} }
						onFocus={ () => onHover( item ) }
						onMouseEnter={ () => onHover( item ) }
						onMouseLeave={ () => onHover( null ) }
						onBlur={ () => onHover( null ) }
						item={ item }
					/>
				) ) }
			{ children }
		</ul>
		/* eslint-enable jsx-a11y/no-redundant-roles */
	);
}

export default compose(
	withDispatch( ( dispatch ) => {
		const { installBlockType } = dispatch( 'core/block-directory' );
		return {
			downloadAndInstallBlock: ( item ) => {
				installBlockType( item );
			},
		};
	} )
)( DownloadableBlocksList );
