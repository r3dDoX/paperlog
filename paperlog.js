Profiles = new Meteor.Collection("profiles");
RangedCombatWeapons = new Meteor.Collection("rangedCombatWeapons")

if (Meteor.isClient) {
  Template.profile_list.profiles = function () {
    return Profiles.find();
  };
	
	Template.ranged_combat_weapons_list.rangedCombatWeapons = function () {
		return RangedCombatWeapons.find();
	}
	
	Template.ranged_combat_weapon_form.weapon = function () {
		var weapon = RangedCombatWeapons.findOne({});
		
		if(weapon) {
			Session.set('ranged_combat_weapon_id', weapon._id);
		}
		
		return weapon;
	}
	
	Template.ranged_combat_weapon_form.events = {
		'change input': function (event) {
			var updateObject = {};
			updateObject[event.target.name] = event.target.value;

			RangedCombatWeapons.update(Session.get('ranged_combat_weapon_id'), updateObject);
		}
	}
	
	$(function() {
		$('#rangedCombatWeaponName').val(RangedCombatWeapons.findOne().name);
	});
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}