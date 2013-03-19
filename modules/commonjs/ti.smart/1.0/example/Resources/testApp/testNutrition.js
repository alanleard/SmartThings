Ti.include('lib/business/services/services_nutrition.js');

var testcalorieCalculator = mcd.services.nutrition.calorieCalculator(100, 12, 60, 'M', 5);
alert('calorieCalculator()' + testcalorieCalculator);

mcd.services.nutrition.getMenu("MenuInformation", "GetBurgerCategoryList", 'menu')
Ti.App.addEventListener('menu', function(e) {
	alert(e)
});

mcd.services.nutrition.getNutriProfile('nutri_profile')
Ti.App.addEventListener('nutri_profile', function(e) {
	alert(e)
});

mcd.services.nutrition.saveNutriProfile('M', 25, 100, 100, 'nutri_saved')
Ti.App.addEventListener('nutri_saved', function(e) {
	alert(e)
}); 