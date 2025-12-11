## Relationship Field Selection Bug with Multiple Collections
Issue: When using a Payload CMS relationship field that relates to multiple collections (relationTo: ['collectionA', 'collectionB']), entries from different 
collections with the same ID will both appear selected in the admin UI dropdown when only one is actually selected.

### Affected Components:
Call-to-Action (CTA) block destination field

### Example Scenario:
Create a Project with ID 1
Create a Case Study with ID 1
In a CTA block, select the Project (ID: 1) as the destination
Both the Project and Case Study with ID 1 will appear as selected in the dropdown UI

### Root Cause:
Payload CMS's relationship field admin UI determines selection state using only the entry ID, without considering which collection the entry belongs to. When storing relationship data, Payload correctly saves both relationTo (collection) and value (ID), but the selection UI logic fails to scope the selection check by collection.

# Recreating the issue:

Navigate to the project's root directory and run ``` npm install ``` & ``` npm run dev ```

Log into the cms by visiting /admin route, log in as the following user:

```
user: test@email.com
pass: 123
```
and visit this route: 
```
http://localhost:3000/admin/collections/projects/1
```

Now in the CTA content block, you'll see the destination drop down. If you click it, you'll notice that both id 1's are selected except the button on the frontend, actually only links to one of them.
Here's the frontend url: 
```
http://localhost:3000/projects/project-1
```
