const config = require('./config.json');

module.exports = function(api) {
  setInterval(() => {
    config.groups.forEach(group => {
      // گروپ کا نام مانیٹر کریں
      api.getThreadInfo(group.group_id, (err, info) => {
        if (err) return console.error(`Error fetching info for group ${group.group_id}:`, err);

        // Group name ko reset karna
        if (info.name !== group.original_group_name) {
          api.changeThreadTitle(group.group_id, group.original_group_name, (err) => {
            if (err) return console.error(`Error resetting group name for ${group.group_id}:`, err);
            console.log(`Group name reset for group ${group.group_id}`);
          });
        }

        // Members ke nicknames ko monitor aur reset karna
        info.participants.forEach(member => {
          if (group.original_member_names[member.userID] && member.nickname !== group.original_member_names[member.userID]) {
            api.changeUserNickname(group.group_id, member.userID, group.original_member_names[member.userID], (err) => {
              if (err) return console.error(`Error resetting nickname for ${member.userID}:`, err);
              console.log(`Nickname reset for ${member.userID} in group ${group.group_id}`);
            });
          }
        });
      });
    });
  }, 5000); // ہر 5 سیکنڈ بعد چیک کریں
};