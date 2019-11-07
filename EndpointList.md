# Feedback

## Save feedback
/feedback/save
{ "text" : "this app was great", "canvasId" : "ID returned after saving canvas" }

# Canvas 

## Save canvas
Returns canvas object in order to attach canvasId to feedback object.
/canvas/save
{ "imageString" : "JSON or SVG string" }

## Get all saved canvas'
/canvas/all

## Get single canvas
/canvas/:canvasID
