// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DNFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIdCounter;
      struct UserInfo{
          bool isUser;
          uint256 _tokenId;
          uint256 noOfRewards; 
          bool isPremium;
      }
      struct RewardInfo{
          string reward;
          uint256 issueDate;
          uint256 expiryDate;
          bool isRedeemed; 
      }
      RewardInfo[] public rewards;
    mapping(address=>UserInfo) public addressToUser;
    mapping(address=>RewardInfo[]) public addressToReward;

    error InvalidUser(address _address);
    error AlreadyExist(address _address);
    error AlreadyRedeemed(uint _rewardId);
    // error AlreadyPremium(address _address);
    error Expired(uint _rewardId);
    
    constructor() ERC721("BitToken", "BIT") {}

    function safeMint(address to, string memory newUri,bool _isRewarded,bool _isPremium,string memory _reward, uint256 _expiryDate) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId,newUri);
        /*########### Customised Code Starts ############*/
        
        /*### User Registration ###*/
        if(addressToUser[to].isUser){
           revert AlreadyExist(to);
        }

        if(_isRewarded){
            require(_expiryDate>block.timestamp,"Invalid date");
            RewardInfo memory newReward = RewardInfo({
                reward:_reward,
                issueDate:block.timestamp,
                expiryDate:_expiryDate,
                isRedeemed:false
            });
            addressToReward[to].push(newReward); 
            }
        
        UserInfo memory newUser = UserInfo({
            isUser:true,
            _tokenId:tokenId,
            noOfRewards:1,
            isPremium:_isPremium
        });
        addressToUser[to] = newUser;
    }
    // https://gateway.pinata.cloud/ipfs/QmNkhLgnrJqLSPBkDXuTkPzuhvumQYTmDRbEKvXfEyxT54
    // The following functions are overrides required by Solidity.
    
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
     
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
    function getLength(address _userAddress) public view returns(uint){
    return addressToReward[_userAddress].length;
    }
    
   function updateNFT(uint _tokenId,address _userAddress,bool _isPremium,bool _isRewarded,string memory _reward,uint _expiryDate) public {
    if(!addressToUser[_userAddress].isUser || ownerOf(_tokenId) != _userAddress){
        revert InvalidUser(_userAddress);
    }
    UserInfo storage updateUser = addressToUser[_userAddress];
    RewardInfo memory _newReward;
    
    if(_isPremium == true){
    updateUser.isPremium = true;
    }
    else if(!_isPremium){
        updateUser.isPremium = false;
    }

    if(_isRewarded == true){
        updateUser.noOfRewards++;
        _newReward = RewardInfo({
            reward:_reward,
            issueDate:block.timestamp,
            expiryDate:_expiryDate,
            isRedeemed:false
        });
       addressToReward[_userAddress].push(_newReward);
    }
} 

    function redeem(address _userAddress,uint _arrId) public{
        UserInfo storage userInfo = addressToUser[_userAddress];
         RewardInfo storage existingReward = addressToReward[_userAddress][_arrId];
         if(existingReward.isRedeemed){
             revert AlreadyRedeemed(_arrId);
         }
         if(existingReward.expiryDate < block.timestamp){
             revert Expired(_arrId);
         }
        existingReward.isRedeemed = true;
        userInfo.noOfRewards--;

  }  
} 
//membership will be changed to regular and premium fluctuate.....
//expiry should be greater than block.timestamp