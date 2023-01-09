// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DNFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    struct UserInfo {
        bool isUser;
        uint256 _tokenId;
        uint256 noOfRewards;
        uint noOfVisit;
        bool isRedeemed;
        bool isPremium;
    }
    mapping(address => UserInfo) public addressToUser;

    constructor() ERC721("MyToken", "MTK") {}

    event MintLog(
        address _from,
        address indexed _to,
        string indexed _nftURI,
        uint _tokenId,
        uint indexed date,
        uint expiryDate,
        string message,
        uint _noOfVisit,
        bool _isRedeemed
    );

    error NotEnoughRewards(string);
    error InvalidUser(string);

    function safeMint(
        address to,
        string memory newUri,
        string memory _message,
        uint _date,
        uint _expiryDate,
        bool _isRewarded,
        bool _isPremium
    ) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, newUri);
        uint _noOfRewards;
        if (_isRewarded == true || _isPremium == true) {
            _noOfRewards++;
        } else {
            _noOfRewards = 0;
            _expiryDate = 0;
        }
        UserInfo memory newUser = UserInfo({
            isUser: true,
            noOfRewards: _noOfRewards,
            _tokenId: tokenId,
            noOfVisit: 1,
            isRedeemed: false,
            isPremium: _isPremium
        });

        addressToUser[to] = newUser;
        emit MintLog(
            msg.sender,
            to,
            newUri,
            tokenId,
            _date,
            _expiryDate,
            _message,
            newUser.noOfVisit,
            newUser.isRedeemed
        );
    }

    // The following functions are overrides required by Solidity.

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    // function changeUserNFT(address _userAddress,uint _tokenId,string memory newURI,uint _date,string memory _message,uint _noOfRedeem,bool _isRedeemed) public onlyOwner{
    // _setTokenURI(_tokenId,newURI);
    // UserInfo storage user = addressToUser[_userAddress];
    // if(ownerOf(_tokenId)!=_userAddress){
    //     revert InvalidUser("Addresses mismatched");
    // }
    // if(user.noOfRewards<_noOfRedeem){
    //     revert NotEnoughRewards("No Rewards Left");
    // }
    // user.noOfVisit++;

    // emit MintLog(msg.sender,_userAddress,newURI,_tokenId,_date,_message,user.noOfVisit,_isRedeemed);
    // }
}
