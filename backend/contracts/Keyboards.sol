// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract Keyboards {
    enum KeyboardKind { 
	    SixtyPercent, 
	    SeventyFivePercent,
        EightyPercent, 
	    Iso105 
	}
    struct Keyboard {
        KeyboardKind kind; 
        bool isPBT;
        string filter;
        address owner;
    }
    Keyboard[] public createdKeyboards;
    event KeyboardCreated(Keyboard keyboard);
    event TipSent(address indexed recipient, address indexed sender, uint256 amount);

    function getKeyboards() view public returns(Keyboard[] memory) {
        return createdKeyboards;
    }

    function create(KeyboardKind _kind, bool _isPBT, string calldata _filter) external {
        Keyboard memory newKeyboard = Keyboard({
        kind: _kind,
        isPBT: _isPBT,
        filter: _filter,
        owner: msg.sender
        });
        createdKeyboards.push(newKeyboard);
        emit KeyboardCreated(newKeyboard);
    }

    function tip(uint _index) external payable {
        Keyboard memory getKeyboard = createdKeyboards[_index];
        address theOwner = getKeyboard.owner;
        payable(theOwner).transfer(msg.value);
        emit TipSent(theOwner, msg.sender, msg.value);
    } 

}