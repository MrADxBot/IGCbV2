module.exports = {

	active : true,
	category : 'Роли',

	name : 'alive',
	title : 'Доступ к сообществу',
	description : 'Переключает у указанных пользователей роль alive',
	descriptionShort : 'Переключает у указанных пользователей роль alive',


	init : function(path){
		this.role = guild.roles.cache.get('648762974277992448');

		if(!this.role){
			this.active = false;
			log.error(path + ': Роль "alive" не найдена');
		}

		return this;
	},


	/**
	 * Обработка команды
	 * Проверяет наличие прав и выдаёт роль
	 * @param {CommandInteraction|UserContextMenuInteraction} int    Команда пользователя
	 * @param {GuildMember|Number}                            member Объект или ID пользователя
	 */
	call : async function(int, member){
		if(!this.permission(int.member))
			return int.reply({
				content : reaction.emoji.error + ' У вас недостаточно прав для изменения ролей других пользователей',
				ephemeral : true
			});

		const result = toggleRole(this.role, member, int.member);

		if(!result[0]) return int.reply({ content : reaction.emoji.error + ' ' + result[1], ephemeral : true});

		return int.reply({ content : reaction.emoji.success + ' ' + result[1] });
	},


	/**
	 * Обработка слеш-команды
	 * @param {CommandInteraction} int Команда пользователя
	 */
	slash : async function(int){
		this.call(int, int.options.get('user'));
	},

	/**
	 * Обработка контекстной команды
	 * @param {UserContextMenuInteraction} ctx
	 */
	contextUser : async function(int){
		this.call(int, int.targetMember);
	},

	/**
	 * Проверка наличия роли Сенат или Привратник
	 *
	 * @param {GuildMember} member
	 */
	permission : member =>
		member._roles.includes('613412133715312641') ||
		member._roles.includes('916999822693789718')

};