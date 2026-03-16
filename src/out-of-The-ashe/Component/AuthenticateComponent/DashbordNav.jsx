import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronDown, 
  faSearch, 
  faPlus, 
  faSignOutAlt, 
  faUserCircle, 
  faGear,
  faCirclePlus,
  faMessage,
  faHouse,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

// Redux & Config
import { logout } from '../../Redux/auth';
import { useGetUserQuery } from '../../Redux/User';
import { useGetChildbyNameQuery } from '../../Redux/Childes';
import { useGetUnreadMessageQuery } from '../../Redux/message';
import { APi } from '../../Redux/CenteralAPI';
import { socket } from './SocketIoConfig';

const DashbordNav = () => {
  // --- States ---
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showSettingMenu, setShowSettingMenu] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // --- Redux & Navigation ---
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useSelector((state) => state.auth);
  const { ActiveChatId } = useSelector((state) => state.webState);
  
  // --- API Queries ---
  const { data: user } = useGetUserQuery(id);
  const { data: childResults, isFetching: isSearching } = useGetChildbyNameQuery(searchValue, {
    skip: searchValue.length < 2
  });
  const { data: unreadData } = useGetUnreadMessageQuery(id);

  // --- Effects ---
  useEffect(() => {
    setUnreadCount(unreadData);
  }, [unreadData]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Socket.io Logic ---
  useEffect(() => {
    const handleMessageReceive = (data) => {
      if (ActiveChatId !== data.senderId) {
        dispatch(APi.util.invalidateTags([{ type: "unreadMessage", id: "unread" }, { type: "conversion", id: "coversionId" }]));
      } else {
        dispatch(APi.util.invalidateTags([{ type: "conversion", id: "coversionId" }]));
        socket.emit('both_message_mark', { id: id, other_id: data.senderId });
      }
    };
    socket.on('receive_message', handleMessageReceive);
    return () => socket.off('receive_message', handleMessageReceive);
  }, [ActiveChatId, id, dispatch]);

  // --- Handlers ---
  const handleLogout = () => dispatch(logout());

  return (
    <nav className={`fixed top-0 inset-x-0 h-20 z-[100] transition-all duration-300 px-4 sm:px-8 flex items-center justify-between
      ${isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm' : 'bg-white/30 backdrop-blur-sm'}`}>
      
      {/* Branding */}
      <Link to="/DashbordPage" className="flex items-center gap-3 group">
        <div className="w-11 h-11 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:rotate-6 transition-transform">
          <span className="text-white font-black text-xl italic">C</span>
        </div>
        <div className="flex flex-col max-md:hidden">
          <span className="font-black text-lg leading-none tracking-tight text-slate-900">CENTRAL</span>
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest leading-none mt-1">Workspace</span>
        </div>
      </Link>

      {/* Modern Search Engine Interface */}
      <div className="relative flex-1 max-w-md mx-6 max-sm:hidden">
        <div className="relative group">
          <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <input 
            type="text" 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search child records..." 
            className="w-full bg-slate-100/50 border border-transparent focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 py-2.5 pl-11 pr-10 rounded-2xl outline-none transition-all text-sm font-medium"
          />
          {searchValue && (
            <button onClick={() => setSearchValue('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500">
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {searchValue.length >= 2 && (
          <div className="absolute top-14 left-0 right-0 bg-white/95 backdrop-blur-xl border border-slate-100 rounded-[24px] shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
            {isSearching ? (
              <div className="p-4 text-center text-xs font-bold text-slate-400 animate-pulse uppercase">Searching...</div>
            ) : childResults?.length > 0 ? (
              <div className="max-h-80 overflow-y-auto">
                {childResults.map(child => (
                  <Link key={child._id} to={`/ChildSingle/${child._id}`} onClick={() => setSearchValue('')} className="flex items-center gap-4 p-3 hover:bg-blue-50 rounded-xl transition-all group">
                    <img src={child.Childfile?.[0]?.mediaurl} className="w-10 h-10 rounded-lg object-cover ring-2 ring-white shadow-sm" alt="" />
                    <div className="flex-1">
                      <p className="font-bold text-slate-800 text-sm">{child.childFirstName} {child.childLastName}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Grade {child.Grade}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-sm text-slate-400 font-medium">No results found</div>
            )}
          </div>
        )}
      </div>

      {/* Action Icons */}
      <div className="flex items-center gap-2 sm:gap-5">
        <Link to="/DashbordPage" className="p-2 text-slate-400 hover:text-blue-600 transition-all max-sm:hidden">
          <FontAwesomeIcon icon={faHouse} size="lg" />
        </Link>

        <Link to="/MessagePage" className="relative p-2 text-slate-400 hover:text-blue-600 transition-all">
          <FontAwesomeIcon icon={faMessage} size="lg" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce">
              {unreadCount}
            </span>
          )}
        </Link>

        {/* Global Add Menu */}
        <div className="relative">
          <button 
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-blue-600 transition-all active:scale-90 shadow-lg shadow-slate-200"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
          
          {showAddMenu && (
            <div className="absolute right-0 mt-4 w-64 bg-white border border-slate-100 rounded-[24px] shadow-2xl p-2 z-50">
              <p className="text-[10px] font-black text-slate-400 uppercase p-3 tracking-widest">Registration</p>
              <button onClick={() => { navigate('/ChildRegister'); setShowAddMenu(false); }} className="w-full flex items-center gap-3 p-3 hover:bg-blue-50 rounded-xl text-left transition-all group">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all"><FontAwesomeIcon icon={faPlus} /></div>
                <span className="font-bold text-sm text-slate-700">New Child</span>
              </button>
              {user?.role === 'Admin' && (
                <button onClick={() => { navigate('/EmployeerRgister'); setShowAddMenu(false); }} className="w-full flex items-center gap-3 p-3 hover:bg-indigo-50 rounded-xl text-left transition-all group">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all"><FontAwesomeIcon icon={faPlus} /></div>
                  <span className="font-bold text-sm text-slate-700">New Employee</span>
                </button>
              )}
            </div>
          )}
        </div>

        <div className="h-8 w-[1px] bg-slate-200 mx-1 max-sm:hidden" />

        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1 hover:bg-white rounded-2xl transition-all border border-transparent hover:border-slate-100 hover:shadow-sm"
          >
            <img src={user?.profile?.mediaurl || user?.profile} className="w-10 h-10 rounded-xl object-cover shadow-md" alt="" />
            <FontAwesomeIcon icon={faChevronDown} className={`text-[10px] text-slate-400 transition-transform duration-300 ${showUserMenu ? 'rotate-180 text-blue-600' : ''}`} />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-4 w-56 bg-white border border-slate-100 rounded-[24px] shadow-2xl p-2 z-50 overflow-hidden">
              <div className="px-4 py-3 mb-2 bg-slate-50 rounded-2xl">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Connected as</p>
                <p className="text-sm font-black text-slate-800 truncate">{user?.firstName} {user?.lastName}</p>
              </div>
              
              <Link to="/ProfilePage" onClick={() => setShowUserMenu(false)} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl font-bold text-sm text-slate-600 group">
                <FontAwesomeIcon icon={faUserCircle} className="text-slate-400 group-hover:text-blue-600" /> Profile
              </Link>
              
              <button onClick={() => setShowSettingMenu(!showSettingMenu)} className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl font-bold text-sm text-slate-600 group transition-all">
                <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faGear} className="text-slate-400 group-hover:text-blue-600" /> Settings
                </div>
                <FontAwesomeIcon icon={faChevronDown} className={`text-[10px] transition-transform ${showSettingMenu ? 'rotate-180' : ''}`} />
              </button>

              {showSettingMenu && (
                <div className="ml-4 mt-1 space-y-1 animate-in slide-in-from-left-2">
                    <button onClick={() => navigate('/PasswordChange')} className="w-full text-left p-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-all underline decoration-blue-100 underline-offset-4">Change Password</button>
                    <button className="w-full text-left p-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-all underline decoration-blue-100 underline-offset-4">FAQs & Support</button>
                </div>
              )}

              <div className="my-2 border-t border-slate-50" />
              
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 rounded-xl font-black text-sm transition-colors"
              >
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashbordNav;