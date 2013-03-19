Ti.include('lib/presentation/ui.js')

var largeLabel = mcd.ui.createLargeLabel('Large Label', mcd.utils.scale(10, 'v'), 'center', 10)
var uiObj = [largeLabel]

var label = mcd.ui.createStandardLabel('StandardLabel', mcd.utils.scale(15, 'v'), 'center', 150)
uiObj.push(label)

var tintLabel = mcd.ui.createTintLabel('Tint Label', mcd.utils.scale(35, 'v'), 'center', 10)
uiObj.push(tintLabel);

var tf = mcd.ui.createStandardTextBox('Name', mcd.utils.scale(90, 'v'), 20, 'auto', 150)
uiObj.push(tf);

var pwdTextF = mcd.ui.createPasswordTextBox('password', mcd.utils.scale(60, 'v'), 20, 'auto', 150)
uiObj.push(pwdTextF);

var rotateBtn = mcd.ui.createStandardButton('Standard Button', mcd.utils.scale(120, 'v'), 30, 'auto', 'auto');
uiObj.push(rotateBtn);

var imgView = mcd.ui.createImageView('image View', '/theme/icon_sundae.png', mcd.utils.scale(50, 'v'), mcd.utils.scale(200, 'h'), 70, 70);

var view = mcd.ui.createView(mcd.utils.scale(150, 'v'), 40, 40, 40, 'vertical', 1, 'View');

view.backgroundColor = '#550B0B'
uiObj.push(view);

var transformation = mcd.ui.animate2DRotate(270);

var rotate = Titanium.UI.createAnimation({
	transform : transformation,
	duration : 1500,
	curve : Titanium.UI.ANIMATION_CURVE_EASE_IN_OUT,
	autoreverse : true
});
view.animate(rotate);
view.animate = true;

if(Ti.Platform.osname === 'iphone') {
	var view3D = mcd.ui.createView(mcd.utils.scale(150, 'v'), 120, 40, 40, 'vertical', 1, 'View3D');
	view.backgroundColor = '#550B0B'
	uiObj.push(view3D);
	var transformation3D = mcd.ui.animate3DRotate();

	var rotate3D = Titanium.UI.createAnimation({
		transform : transformation3D,
		duration : 1500,
		curve : Titanium.UI.ANIMATION_CURVE_EASE_IN_OUT,
		autoreverse : true
	});
	view3D.animate(rotate3D);
	view3D.animate = true;

}

rotateBtn.addEventListener('click', function(e) {
	var alt = mcd.ui.createAlert('Button Clicked');
	alt.show();

})
uiObj.push(imgView);

var webView = mcd.ui.createWebView("http://www.google.com", mcd.utils.scale(80, 'v'), mcd.utils.scale(320, 'h'));
webView.top = mcd.utils.scale(330, 'v')
uiObj.push(webView);

var scaledTransformation = mcd.ui.animateScale();
scaledTransformation = scaledTransformation.rotate(270);
var scaledAnimation = Titanium.UI.createAnimation();
scaledAnimation.transform = scaledTransformation;
scaledAnimation.duration = 1500;
scaledAnimation.autoreverse = true;

var scaledAnimView = Titanium.UI.createView({
	backgroundColor : '#336699',
	top : mcd.utils.scale(150, 'v'),
	left : 260,
	height : 40,
	width : 40,
	anchorPoint : {
		x : 0.5,
		y : 0.5
	}
});

scaledAnimView.animate(scaledAnimation);
uiObj.push(scaledAnimView);

var indicator = mcd.ui.createMaskLoadingIndicator("Loading...");

var win1 = mcd.ui.constructWindow('Testing UI', 'single', uiObj);

win1.open();

