(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"0QAa":function(t,e,r){"use strict";r.d(e,"a",function(){return c});var o=r("mrSG"),n=r("2Qvw"),i=r("xMyE"),s=(r("OxCI"),r("jtoX"),function(){return(s=Object.assign||function(t){for(var e,r=1,o=arguments.length;r<o;r++)for(var n in e=arguments[r])Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t}).apply(this,arguments)}),c=function(t){function e(e,r){var o=t.call(this,null)||this;return o.projectStore=e,o.sprintService=r,console.log("initialized sprint store"),o.projectStore.state$.subscribe(function(t){t&&(o.loadStateFromProject(t),o.sprintService.setProjectRoute(t._id))}),o}return Object(o.c)(e,t),e.prototype.loadStateFromProject=function(t){var e=t.activeSprint&&t.sprints.find(function(e){return e._id===t.activeSprint});return e?(console.log("Loaded sprint from project state",e),this.setState(s({},e))):null},e.prototype.createSprint=function(t){var e=this;return this.sprintService.create(t).pipe(Object(i.a)(function(t){return e.setState(s({},e.state,t))}))},e.prototype.getSprint=function(t){var e=this;return this.sprintService.getSprint(t).pipe(Object(i.a)(function(t){return e.setState(s({},e.state,t))}))},e.prototype.updateSprint=function(t){var e=this;return this.sprintService.update(t).pipe(Object(i.a)(function(){return e.setState(s({},e.state,t))}))},e.prototype.addTask=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var r=s({},this.state,{tasks:this.state.tasks.concat(t)});return this.updateSprint(r).subscribe()},e.prototype.removeTask=function(t){var e=s({},this.state),r=e.tasks.findIndex(function(e){return t===e});return e.tasks.splice(r,1),this.updateSprint(e).subscribe()},e}(n.a)},"7lCe":function(t,e,r){"use strict";r.d(e,"a",function(){return n});var o=r("AytR"),n=function(){function t(t){this.http=t,this.apiRoute=""+o.a.apiBaseUrl}return t.prototype.setProjectRoute=function(t){this.projectRoute=this.apiRoute+"/projects/"+t+"/tasks"},t.prototype.createTasks=function(t){return this.http.post(this.projectRoute,{tasks:t})},t.prototype.getTasks=function(){return this.http.get(this.projectRoute)},t.prototype.updateTaskStatus=function(t,e){return this.http.patch(this.projectRoute,{},{params:{task:t,status:e}})},t}()},"9RyU":function(t,e,r){"use strict";r.d(e,"a",function(){return n});var o=r("AytR"),n=function(){function t(t){this.http=t,this.apiRoute=""+o.a.apiBaseUrl}return t.prototype.setProjectRoute=function(t){this.projectRoute=this.apiRoute+"/projects/"+t+"/worksession"},t.prototype.create=function(t){return this.http.post(this.projectRoute,{taskId:t})},t.prototype.stopWorkSession=function(t){return this.http.patch(this.projectRoute,{workSession:t})},t}()},OxCI:function(t,e,r){"use strict";r.d(e,"a",function(){return n});var o=r("AytR"),n=function(){function t(t){this.http=t,this.apiRoute=""+o.a.apiBaseUrl}return t.prototype.setProjectRoute=function(t){this.projectRoute=this.apiRoute+"/projects/"+t+"/sprint"},t.prototype.create=function(t){return this.http.post(this.projectRoute,t)},t.prototype.getSprint=function(t){return this.http.get(this.projectRoute+"?sprintId="+t)},t.prototype.update=function(t){return this.http.patch(this.projectRoute+"?sprintId="+t._id+"}",t)},t}()},"P/pa":function(t,e,r){"use strict";r.d(e,"a",function(){return c});var o=r("mrSG"),n=r("2Qvw"),i=r("xMyE"),s=(r("7lCe"),r("jtoX"),function(){return(s=Object.assign||function(t){for(var e,r=1,o=arguments.length;r<o;r++)for(var n in e=arguments[r])Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t}).apply(this,arguments)}),c=function(t){function e(e,r){var o=t.call(this,[])||this;return o.projectStore=e,o.taskService=r,o.projectStore.state$.subscribe(function(t){t&&(o.taskService.setProjectRoute(t._id),o.loadStateFromProject(t))}),o}return Object(o.c)(e,t),e.prototype.loadStateFromProject=function(t){t&&t.tasks&&this.setState(t.tasks.slice())},e.prototype.getTasks=function(){var t=this;return this.taskService.getTasks().pipe(Object(i.a)(function(e){return t.setState(e.slice())}))},e.prototype.createTasks=function(t){var e=this;return this.taskService.createTasks(t).pipe(Object(i.a)(function(t){return e.setState(e.state.concat(t))}))},e.prototype.updateTaskStatus=function(t,e){var r=this;return this.taskService.updateTaskStatus(t._id,e).pipe(Object(i.a)(function(){var o="done"===e?new Date(Date.now()):null;r.setState(r.state.map(function(e){return e._id!==t._id?e:s({},e,{completedAt:o})}))}))},e.prototype.getTaskById=function(t){return this.state.find(function(e){return e._id===t})},e.prototype.getPendingTasks=function(){return this.state.filter(function(t){return!t.status})},e}(n.a)},XEwk:function(t,e,r){"use strict";r.d(e,"a",function(){return n});var o=r("AytR"),n=function(){function t(t){this.http=t,this.apiRoute=""+o.a.apiBaseUrl}return t.prototype.getTeamInfo=function(t){return this.http.get(this.apiRoute+"/projects/"+t+"/users")},t}()},"c+ij":function(t,e,r){"use strict";r.d(e,"a",function(){return a});var o=r("mrSG"),n=r("VnD/"),i=r("67Y/"),s=r("xMyE"),c=r("2Qvw"),a=(r("XEwk"),r("jb8x"),r("jtoX"),function(t){function e(e,r,o){var n=t.call(this,null)||this;return n.teamService=e,n.projectSocketService=r,n.projectStore=o,n.updateOnProjectLoad(),n}return Object(o.c)(e,t),e.prototype.updateOnProjectLoad=function(){var t=this;this.projectStore.state$.pipe(Object(n.a)(function(t){return null!==t}),Object(i.a)(function(t){return t._id})).subscribe(function(e){return t.getTeamInfo(e).subscribe()})},e.prototype.getTeamInfo=function(t){var e=this;return this.teamService.getTeamInfo(t).pipe(Object(s.a)(function(t){return e.setState(t)}))},e.prototype.getTeamMemberInfo=function(t){return this.state.find(function(e){return e.uuid===t})},e.prototype.listenSocketLivePatches=function(){var t=this;this.projectSocketService.onNotifyNewTeamMember().pipe(Object(i.a)(function(t){return t.user})).subscribe(function(e){console.log("team store catched update"),t.livePatchNewTeamMember(e)})},e.prototype.livePatchNewTeamMember=function(t){console.log(this.state),console.log("live patch!",t),this.setState(this.state.concat([t])),console.log(this.state)},e}(c.a))},heIc:function(t,e,r){"use strict";r.d(e,"a",function(){return c});var o=r("mrSG"),n=(r("9RA9"),r("xMyE")),i=r("2Qvw"),s=(r("jtoX"),r("9RyU"),function(){return(s=Object.assign||function(t){for(var e,r=1,o=arguments.length;r<o;r++)for(var n in e=arguments[r])Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t}).apply(this,arguments)}),c=function(t){function e(e,r,o){var n=t.call(this,null)||this;return n.worksessionService=e,n.projectStore=r,n.socket=o,n.projectStore.state$.subscribe(function(t){t&&n.worksessionService.setProjectRoute(t._id)}),n}return Object(o.c)(e,t),e.prototype.setWorkSessionConfig=function(t,e){this.timebox=e,this.task=t},e.prototype.createWorkSession=function(t,e){var r=this;return void 0===e&&(e=0),this.worksessionService.create(t._id).pipe(Object(n.a)(function(o){r.setWorkSessionConfig(t,e),r.setState(s({},r.state,o));var n=r.projectStore.getProjectId();r.socket.emit("workSessionStarted",s({},o,{projectId:n}))}))},e.prototype.stopWorkSession=function(){var t=this;return this.worksessionService.stopWorkSession(this.state).pipe(Object(n.a)(function(){var e=new Date(Date.now());console.log(e),t.setState(s({},t.state,{endedAt:e}))}))},e}(i.a)}}]);