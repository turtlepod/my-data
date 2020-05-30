const {
	data: { useSelect, useDispatch },
	plugins: { registerPlugin },
	element: { useState, useEffect, Fragment },
	components: { TextControl, PanelBody },
	editPost: { PluginSidebar, PluginSidebarMoreMenuItem },
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

	const [myData, setMyData] = useState(_my_data);

	useEffect(() => {
		editPost({
			meta: {
				...meta,
				_my_data: myData,
			},
		});
	}, [myData]);

	const sidebarName = 'myDataSidebar';
	const sidebarLabel = 'My Data Config';

	return (
		<Fragment>
			<PluginSidebarMoreMenuItem target={sidebarName}>
				{ sidebarLabel }
			</PluginSidebarMoreMenuItem>
			<PluginSidebar name={sidebarName} title={ sidebarLabel }>
				<PanelBody>
					<TextControl value={myData} onChange={setMyData} />
				</PanelBody>
			</PluginSidebar>
		</Fragment>
	);
};

if (window.pagenow === 'post') {
	registerPlugin('mydata', {
		render: MyDataSettings,
		icon: 'heart',
	});
}
