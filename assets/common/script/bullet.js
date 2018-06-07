var mvs = require("Matchvs");
cc.Class({
    extends: cc.Component,

    properties: {
        speed: 0
    },

    init(playerId) {
        this.hostPlayerId = playerId;
        if (this.hostPlayerId !== GLB.userInfo.id) {
            this.curSpeed = -this.speed;
            this.node.rotation = 180;
        } else {
            this.curSpeed = this.speed;
            this.node.rotation = 0;
        }
    },

    onCollisionEnter: function(other) {
        var group = cc.game.groupList[other.node.groupIndex];
        if (group === 'rival') {
            this.sendRecycleBulletMsg();
        } else if (group === 'item') {
            this.sendRecycleBulletMsg();
        } else if (group === 'ground') {
            this.sendRecycleBulletMsg();
        } else if (group === 'obstacle') {
            this.sendRecycleBulletMsg();
        }
    },

    sendRecycleBulletMsg() {
        if (Game.GameManager.gameState === GameState.Play && GLB.isRoomOwner) {
            mvs.engine.sendFrameEvent(JSON.stringify({
                action: GLB.RECYCLE_BULLET,
                bulletId: this.bulletId
            }));
        }
    },

    update(dt) {
        this.node.setPositionY(this.node.position.y + (this.curSpeed * dt));
    }
});
