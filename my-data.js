const {
	data: { useSelect, useDispatch },
	date: { dateI18n },
	plugins: { registerPlugin },
	element: { useState, useEffect },
	components: { DateTimePicker, Popover, Button, PanelRow },
	editPost: { PluginDocumentSettingPanel },
} = wp;

/**
 * Sidebar metabox.
 */
const MyDataSettings = () => {
	const {
		meta,
		meta: { _my_data },
	} = useSelect((select) => ({
		meta: select('core/editor').getEditedPostAttribute('meta') || {},
	}));

	const { editPost } = useDispatch('core/editor');

	const [openDatePopup, setOpenDatePopup] = useState( false );

	const [myData, setMyData] = useState(_my_data);

	useEffect(() => {
		editPost({
			meta: {
				...meta,
				_my_data: myData,
			},
		});
	}, [myData]);

	return (
		<PluginDocumentSettingPanel name="my-data" title="My Data">
			<PanelRow>
				<span>My Data</span>
				<div className="components-dropdown">
					<Button isLink={true} onClick={() => setOpenDatePopup( ! openDatePopup )}>
						{ myData ? dateI18n( 'F j, Y g:i a', myData ) : "Pick Date & Time" }
					</Button>
					{ openDatePopup && (
						<Popover position="bottom" onClose={ setOpenDatePopup.bind( null, false )}>
							<DateTimePicker
								label="My Date/Time Picker"
								currentDate={myData}
								onChange={setMyData}
								is12Hour ={true}
							/>
						</Popover>
					) }
				</div>
			</PanelRow>
		</PluginDocumentSettingPanel>
	);
};

if (window.pagenow === 'post') {
	registerPlugin('mydata', {
		render: MyDataSettings,
		icon: null,
	});
}
