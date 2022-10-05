// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract Donations is Ownable{
using Counters for Counters.Counter;
   
struct request{
    uint256 id;
    string detail;
    uint256 time;
    address  payable sender;
    uint status;
}

mapping(uint=>request) public idtorequest;
mapping(uint=>uint) public idtofund;
uint256 [] private requestids;
mapping(address=>uint256 []) public usertoreq;
Counters.Counter private _reqIds;


function createRequest(string memory requestdata) public
{
      _reqIds.increment();
      uint id=_reqIds.current();
      request memory req=request(id,requestdata,block.timestamp,payable(msg.sender),0);
      idtorequest[id]=req;
      requestids.push(id);
}

function acceptrequest(uint256 id) public  onlyOwner() {
require(idtorequest[id].id!=0);
idtorequest[id].status=1;
usertoreq[idtorequest[id].sender].push(id);
idtorequest[id].time=block.timestamp;
}

function donateeth(uint256 id) public payable{
    require(idtorequest[id].id!=0);
    require(idtorequest[id].status==1);
    idtofund[id]+=msg.value;
}

modifier onlybyrequester(uint256 id,address requester)
{
    require(idtorequest[id].sender==requester);
    _;
}

modifier validamount(uint256 id,uint256 amount)
{
    require(idtofund[id]>=amount);
    _;
}

function withdraweth(uint256 id,uint256 amount) public onlybyrequester(id,msg.sender) validamount(id,amount){
    idtofund[id]-=amount;
    (idtorequest[id].sender).transfer(amount);
}

function getrequestids() external view returns (uint256  [] memory){
    return requestids;
}
function getuserreq(address account)  external view returns (uint256  [] memory){
    return usertoreq[account];
}
}

// deployed at address 0x1E384ad6D883C75960dcFA406CDE1649f3968B4B Goerli (5) network