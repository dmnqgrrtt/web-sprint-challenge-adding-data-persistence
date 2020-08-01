
exports.up = function (knex) {
    return knex.schema
        .createTable("projects", tbl => {
            tbl.increments();
            tbl.string("project_name").notNullable();
            tbl.string("description");
            tbl.boolean("completed").notNullable().defaultTo(false);
        })
        .createTable("resources", tbl => {
            tbl.increments();
            tbl.string("resource_name").notNullable();
            tbl.string("description");
        })
        .createTable("tasks", tbl => {
            tbl.increments();
            tbl.string("description").notNullable();
            tbl.string("notes");
            tbl.boolean("completed").notNullable().defaultTo(false);
            tbl.integer("project_id")
                .unsigned()
                .notNullable()
                .references("projects.id")
                .onUpdate("CASCADE")
                .onDelete("CASCADE")
        })
        .createTable("projects_resources", tbl => {
            tbl.integer("project_id").unsigned().notNullable().references("projects.id").onDelete("CASCADE").onUpdate("CASCADE");
            tbl.integer("resource_id").unsigned().notNullable().references("resources.id").onDelete("CASCADE").onUpdate("CASCADE");
            tbl.primary(["project_id", "resource_id"]);
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("projects_resources")
        .dropTableIfExists("tasks")
        .dropTableIfExists("resources")
        .dropTableIfExists("projects");
};
