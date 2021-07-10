// Code generated by entc, DO NOT EDIT.

package ent

import (
	"time"

	"github.com/tamagram/nesk/backend/ent/schema"
	"github.com/tamagram/nesk/backend/ent/task"
)

// The init function reads all schema descriptors with runtime code
// (default values, validators, hooks and policies) and stitches it
// to their package variables.
func init() {
	taskFields := schema.Task{}.Fields()
	_ = taskFields
	// taskDescTitle is the schema descriptor for title field.
	taskDescTitle := taskFields[0].Descriptor()
	// task.DefaultTitle holds the default value on creation for the title field.
	task.DefaultTitle = taskDescTitle.Default.(string)
	// taskDescDetails is the schema descriptor for details field.
	taskDescDetails := taskFields[1].Descriptor()
	// task.DefaultDetails holds the default value on creation for the details field.
	task.DefaultDetails = taskDescDetails.Default.(string)
	// taskDescPriority is the schema descriptor for priority field.
	taskDescPriority := taskFields[3].Descriptor()
	// task.DefaultPriority holds the default value on creation for the priority field.
	task.DefaultPriority = taskDescPriority.Default.(int)
	// taskDescCreatedAt is the schema descriptor for created_at field.
	taskDescCreatedAt := taskFields[4].Descriptor()
	// task.DefaultCreatedAt holds the default value on creation for the created_at field.
	task.DefaultCreatedAt = taskDescCreatedAt.Default.(func() time.Time)
}
