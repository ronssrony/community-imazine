class PeerService {
    constructor() {
        if (!this.peer) {
            this.peer = new RTCPeerConnection({
                iceServers: [
                    {
                        urls: [
                            "stun:stun.l.google.com:19302",
                            "stun:global.stun.twilio.com:3478"
                        ],
                    }
                ]
            });
        }
    }

    async getAnswer(offer) {
        try {
            if (this.peer) {
                await this.peer.setRemoteDescription(offer);
                const ans = await this.peer.createAnswer();
                await this.peer.setLocalDescription(ans);
                return ans;
            }
        } catch (error) {
            console.error('Error creating or setting answer:', error);
        }
    }

    async setRemoteAnswer(ans) {
        try {
            if (this.peer) {
                await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
            }
        } catch (error) {
            console.error('Error setting remote answer:', error);
        }
    }

    async getOffer() {
        try {
            if (this.peer) {
                const offer = await this.peer.createOffer();
                await this.peer.setLocalDescription(offer);
                return offer;
            }
        } catch (error) {
            console.error('Error creating or setting offer:', error);
        }
    }
}

export default new PeerService();
