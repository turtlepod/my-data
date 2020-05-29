const {
	data: { useSelect, useDispatch },
	plugins: { registerPlugin },
	element: { useState, useEffect },
	components: { TextControl },
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
			<TextControl value={myData} onChange={setMyData} />
		</PluginDocumentSettingPanel>
	);
};

if (window.pagenow === 'post') {
	registerPlugin('mydata', {
		render: MyDataSettings,
		icon: null,
	});
}
