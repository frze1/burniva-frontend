module.exports = (
  sequelize,
  DataTypes
) => {
  const DailyInput =
    sequelize.define(
      'DailyInput',
      {
        id: {
          type:
            DataTypes.UUID,
          defaultValue:
            DataTypes.UUIDV4,
          primaryKey: true,
        },

        user_id: {
          type:
            DataTypes.UUID,
          allowNull: false,
        },

        // MENTAL
        stress: {
          type:
            DataTypes.INTEGER,
        },

        anxiety: {
          type:
            DataTypes.INTEGER,
        },

        emotional_pressure: {
          type:
            DataTypes.INTEGER,
        },

        // AKADEMIK
        academic_pressure: {
          type:
            DataTypes.INTEGER,
        },

        study_hours: {
          type:
            DataTypes.FLOAT,
        },

        // GAYA HIDUP
        sleep_hours: {
          type:
            DataTypes.FLOAT,
        },

        financial_pressure:
          {
            type:
              DataTypes.INTEGER,
          },

        family_expectation:
          {
            type:
              DataTypes.INTEGER,
          },

        social_support: {
          type:
            DataTypes.INTEGER,
        },

        activity_hours: {
          type:
            DataTypes.FLOAT,
        },

        // HASIL AI
        burnout_score: {
          type:
            DataTypes.INTEGER,
          defaultValue: 0,
        },

        burnout_level: {
          type:
            DataTypes.STRING,
          defaultValue:
            'Rendah',
        },

        recommendation: {
          type:
            DataTypes.JSON,
          allowNull: true,
        },
      },

      {
        tableName:
          'daily_inputs',
      }
    )

  DailyInput.associate =
    (models) => {
      DailyInput.belongsTo(
        models.User,
        {
          foreignKey:
            'user_id',
          as: 'user',
        }
      )
    }

  return DailyInput
}