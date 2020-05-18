/**
 * WordPress dependencies
 */
import { useCallback } from '@wordpress/element';
import {
	BlockNavigationDropdown,
	ToolSelector,
	__experimentalPreviewOptions as PreviewOptions,
} from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import {
	PinnedItems,
	__experimentalMainDashboardButton as MainDashboardButton,
} from '@wordpress/interface';
import { _x } from '@wordpress/i18n';
import { plus } from '@wordpress/icons';
import { Button } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { useEditorContext } from '../editor';
import MoreMenu from './more-menu';
import TemplateSwitcher from '../template-switcher';
import SaveButton from '../save-button';
import UndoButton from './undo-redo/undo';
import RedoButton from './undo-redo/redo';
import FullscreenModeClose from './fullscreen-mode-close';

export default function Header( {
	openEntitiesSavedStates,
	isInserterOpen,
	onToggleInserter,
} ) {
	const { settings, setSettings } = useEditorContext();
	const setActiveTemplateId = useCallback(
		( newTemplateId ) =>
			setSettings( ( prevSettings ) => ( {
				...prevSettings,
				templateId: newTemplateId,
				templateType: 'wp_template',
			} ) ),
		[]
	);
	const setActiveTemplatePartId = useCallback(
		( newTemplatePartId ) =>
			setSettings( ( prevSettings ) => ( {
				...prevSettings,
				templateId: newTemplatePartId,
				templateType: 'wp_template_part',
			} ) ),
		[]
	);
	const addTemplateId = useCallback(
		( newTemplateId ) =>
			setSettings( ( prevSettings ) => ( {
				...prevSettings,
				templateId: newTemplateId,
				templateIds: [ ...prevSettings.templateIds, newTemplateId ],
			} ) ),
		[]
	);

	const deviceType = useSelect( ( select ) => {
		return select( 'core/edit-site' ).__experimentalGetPreviewDeviceType();
	}, [] );

	const {
		__experimentalSetPreviewDeviceType: setPreviewDeviceType,
	} = useDispatch( 'core/edit-site' );

	return (
		<div className="edit-site-header">
			<MainDashboardButton.Slot>
				<FullscreenModeClose />
			</MainDashboardButton.Slot>
			<div className="edit-site-header__toolbar">
				<Button
					className="edit-post-header-toolbar__inserter-toggle"
					isPrimary
					isPressed={ isInserterOpen }
					onClick={ onToggleInserter }
					icon={ plus }
					label={ _x(
						'Add block',
						'Generic label for block inserter button'
					) }
				/>
				<ToolSelector />
				<UndoButton />
				<RedoButton />
				<TemplateSwitcher
					ids={ settings.templateIds }
					templatePartIds={ settings.templatePartIds }
					activeId={ settings.templateId }
					homeId={ settings.homeTemplateId }
					isTemplatePart={
						settings.templateType === 'wp_template_part'
					}
					onActiveIdChange={ setActiveTemplateId }
					onActiveTemplatePartIdChange={ setActiveTemplatePartId }
					onAddTemplateId={ addTemplateId }
				/>
				<BlockNavigationDropdown />
			</div>
			<div className="edit-site-header__actions">
				<PreviewOptions
					deviceType={ deviceType }
					setDeviceType={ setPreviewDeviceType }
				/>
				<SaveButton
					openEntitiesSavedStates={ openEntitiesSavedStates }
				/>
				<PinnedItems.Slot scope="core/edit-site" />
				<MoreMenu />
			</div>
		</div>
	);
}
