// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

error Raffle__NotEnoughEthEntered();

contract Raffle {
    uint256 private immutable i_entranceFee;
    address payable[] private s_players;

    constructor(uint256 _entranceFee) {
        i_entranceFee = _entranceFee;
    }

    function enterRaffle() public payable {
        if (msg.value < i_entranceFee) {
            revert Raffle__NotEnoughEthEntered();
        }
    }

    function getEntranceFee() public view returns (uint256) {
        return i_entranceFee;
    }

    function getPlayer(uint256 index) public view returns (address) {
        return s_players[index];
    }
}
