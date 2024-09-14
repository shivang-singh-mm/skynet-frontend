import './css/EducationAddForm.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../slicer/authSlicer'
import { useNavigate } from 'react-router-dom'
import { cities } from './Cities';

function RegisterForm() {
  const [showFirstComponent, setShowFirstComponent] = useState(true);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    purpose: '',
    password: '',
    confirmpassword: '',
    phoneCode: '',
    isAdmin: false,
    profilePic: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlwMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAABQYHBAEDAv/EADkQAAIBAwEEBwUFCQEAAAAAAAABAgMEBREGITFREiJBYXGx0ROBkaHBJDNCUmIWIyUyQ5KTssIU/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAER/9oADAMBAAIRAxEAPwDUgAaZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIHaLaCON+z2yjO6a138Ka7+/uAmq1ajQh069WFOPOckl8zjWbxTl0f8A32/968zObq5r3dV1bmrOpN9s3r8D5FNazTnCpBTpzjOL/FFpo/RltjfXOPqqpaVZU32pcH4rgy+YDN08tRalFQuYLrw5967iCWAAAAAAAAAAAAAAAAAAHJlb2OPx9a5aTcY9RP8AFLgl8TMq1SdarOrVk51JycpSfFlv28rSja2lBN6TnKT9ySXmU0pQAFQOixu6tjdU7mg+vB66c1yfic4JVjVravC5t6dek9YVIqSfifUgtjK0quEUJNv2VWUVry3P6k6QAAAAAAAAAAAAAAAAVPb2HUsZ984/6lQNA2wtHc4aU4x1lQkqm7ktz+TM/KUABUAASrF62Ihph6kvzV5eUSwkfgLR2WItqM46T6PSn3N7/qSBAAAAAAAAAAAAAAAAB5JKScZLVNaNPtRn20GCqYytKpSi5Wkn1ZLf0O5+poR40nFppNPc01qgMlBod3s1irmWroOlJ9tGTj8uByrY7H6/e3OnLpR9CijFk2XwM7mtTvLuDjbwalCMuNR9nu8yx2ez2Ms5KdO3U5p6qdVubX0+RKEAAAAAAAAAAAAAAAAAAjM1mrfE0uv168lrClF733vkgJGdSFOLnUkoxXGUnokQd7tXjrdtUHK5kvybo/FlPyWUu8lV6VzVbgn1acd0Y+76s4imrNW2yu5fc2tGmv1Nz9D4ftdk9dejb/436kABiLRR2zuIv7RaUprnCbj56kzYbTY27ajKo7eb4KruT9/Az4DDWtKSaTT1T4Ndp6Ztic1eYyaVOfToa76M3u93IvmLydtlLf2ttLet06cv5oPv9SK7QAAAAAAAAAAAPJSUYuUnpFLVvkuYEdncrTxNn7R6SrT3UoPtfPwRnVxXq3NadavNzqTespPtOzOZCWSyNStv9kurSi+yK9eJHgAAaQAAAAADpx97Xx91C4tpaTj2PhJcmcwIrUMZf0clZwuaD3PdKP5XyZ1mfbKZJ2GRVOpLShX6stXui+xmg/IgAAAAAAAAENtZdu1w1RQbU679mvB8flqTJT9vav7yyodijOb8W0l5MCqAAqAAKAAAAAAAABpuFu3fYu3uJPWcoaTf6luZmRdthavTxtxSf9OtqvBpejIqygAgAAAAABR9un/FKC5UP+megCtgA0gAAAAAAAAAABb9gX1L1dnSh5M8BKLaACNAACP/2Q=='
  });

  const [otp, setOtp] = useState('');

  const navigate = useNavigate();

  const [warn, setWarn] = useState(true);
  const [pass, setPass] = useState(true);

  const dispatch = useDispatch();
  const status_register = useSelector((state) => state.auth.register_status);
  const error = useSelector((state) => state.auth.error);
  const message = useSelector((state) => state.auth.message)
  const [errormsg, setError] = useState('')

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(emailRegex.test(email))
    return emailRegex.test(email);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  useEffect(() => {
    if (status_register === 'succeeded') {
      navigate('/login')
    }
    else {
      setError(message);
    }
  }, [status_register])


  const enterOtp = async (e) => {
    e.preventDefault();
    if (form.phone.length != 10 || form.name == "" || !validateEmail(form.email)) setWarn(false);
    else if (form.confirmpassword != form.password) setPass(false)
    else {
      setWarn(true);
      setPass(true);
      setShowFirstComponent(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp == 1234) {
      dispatch(registerUser(form))
    }
    else setError("Wrong Otp");
  };

  return (
    <div>
      {
        showFirstComponent ? (
          <div className="register">
            <form onSubmit={handleSubmit}>
              <h1 className='register-heading'> Register </h1>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <select
                name="phoneCode"
                value={form.phoneCode}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Choose Phone Code
                </option>
                <option value="+93">Afghanistan (+93)</option>
                <option value="+355">Albania (+355)</option>
                <option value="+213">Algeria (+213)</option>
                <option value="+376">Andorra (+376)</option>
                <option value="+244">Angola (+244)</option>
                <option value="+54">Argentina (+54)</option>
                <option value="+374">Armenia (+374)</option>
                <option value="+61">Australia (+61)</option>
                <option value="+43">Austria (+43)</option>
                <option value="+994">Azerbaijan (+994)</option>
                <option value="+973">Bahrain (+973)</option>
                <option value="+880">Bangladesh (+880)</option>
                <option value="+375">Belarus (+375)</option>
                <option value="+32">Belgium (+32)</option>
                <option value="+501">Belize (+501)</option>
                <option value="+229">Benin (+229)</option>
                <option value="+975">Bhutan (+975)</option>
                <option value="+591">Bolivia (+591)</option>
                <option value="+387">Bosnia and Herzegovina (+387)</option>
                <option value="+267">Botswana (+267)</option>
                <option value="+55">Brazil (+55)</option>
                <option value="+673">Brunei (+673)</option>
                <option value="+359">Bulgaria (+359)</option>
                <option value="+226">Burkina Faso (+226)</option>
                <option value="+257">Burundi (+257)</option>
                <option value="+855">Cambodia (+855)</option>
                <option value="+237">Cameroon (+237)</option>
                <option value="+1">Canada (+1)</option>
                <option value="+238">Cape Verde (+238)</option>
                <option value="+236">Central African Republic (+236)</option>
                <option value="+235">Chad (+235)</option>
                <option value="+56">Chile (+56)</option>
                <option value="+86">China (+86)</option>
                <option value="+57">Colombia (+57)</option>
                <option value="+269">Comoros (+269)</option>
                <option value="+242">Congo (Brazzaville) (+242)</option>
                <option value="+243">Congo (Kinshasa) (+243)</option>
                <option value="+506">Costa Rica (+506)</option>
                <option value="+385">Croatia (+385)</option>
                <option value="+53">Cuba (+53)</option>
                <option value="+357">Cyprus (+357)</option>
                <option value="+420">Czech Republic (+420)</option>
                <option value="+45">Denmark (+45)</option>
                <option value="+253">Djibouti (+253)</option>
                <option value="+1-767">Dominica (+1-767)</option>
                <option value="+1-809">Dominican Republic (+1-809)</option>
                <option value="+593">Ecuador (+593)</option>
                <option value="+20">Egypt (+20)</option>
                <option value="+503">El Salvador (+503)</option>
                <option value="+240">Equatorial Guinea (+240)</option>
                <option value="+291">Eritrea (+291)</option>
                <option value="+372">Estonia (+372)</option>
                <option value="+268">Eswatini (+268)</option>
                <option value="+251">Ethiopia (+251)</option>
                <option value="+679">Fiji (+679)</option>
                <option value="+358">Finland (+358)</option>
                <option value="+33">France (+33)</option>
                <option value="+241">Gabon (+241)</option>
                <option value="+220">Gambia (+220)</option>
                <option value="+995">Georgia (+995)</option>
                <option value="+49">Germany (+49)</option>
                <option value="+233">Ghana (+233)</option>
                <option value="+30">Greece (+30)</option>
                <option value="+1-473">Grenada (+1-473)</option>
                <option value="+502">Guatemala (+502)</option>
                <option value="+224">Guinea (+224)</option>
                <option value="+245">Guinea-Bissau (+245)</option>
                <option value="+592">Guyana (+592)</option>
                <option value="+509">Haiti (+509)</option>
                <option value="+504">Honduras (+504)</option>
                <option value="+36">Hungary (+36)</option>
                <option value="+354">Iceland (+354)</option>
                <option value="+91">India (+91)</option>
                <option value="+62">Indonesia (+62)</option>
                <option value="+98">Iran (+98)</option>
                <option value="+964">Iraq (+964)</option>
                <option value="+353">Ireland (+353)</option>
                <option value="+972">Israel (+972)</option>
                <option value="+39">Italy (+39)</option>
                <option value="+225">Ivory Coast (+225)</option>
                <option value="+1-876">Jamaica (+1-876)</option>
                <option value="+81">Japan (+81)</option>
                <option value="+962">Jordan (+962)</option>
                <option value="+7">Kazakhstan (+7)</option>
                <option value="+254">Kenya (+254)</option>
                <option value="+686">Kiribati (+686)</option>
                <option value="+965">Kuwait (+965)</option>
                <option value="+996">Kyrgyzstan (+996)</option>
                <option value="+856">Laos (+856)</option>
                <option value="+371">Latvia (+371)</option>
                <option value="+961">Lebanon (+961)</option>
                <option value="+266">Lesotho (+266)</option>
                <option value="+231">Liberia (+231)</option>
                <option value="+218">Libya (+218)</option>
                <option value="+423">Liechtenstein (+423)</option>
                <option value="+370">Lithuania (+370)</option>
                <option value="+352">Luxembourg (+352)</option>
                <option value="+261">Madagascar (+261)</option>
                <option value="+265">Malawi (+265)</option>
                <option value="+60">Malaysia (+60)</option>
                <option value="+960">Maldives (+960)</option>
                <option value="+223">Mali (+223)</option>
                <option value="+356">Malta (+356)</option>
                <option value="+692">Marshall Islands (+692)</option>
                <option value="+222">Mauritania (+222)</option>
                <option value="+230">Mauritius (+230)</option>
                <option value="+52">Mexico (+52)</option>
                <option value="+691">Micronesia (+691)</option>
                <option value="+373">Moldova (+373)</option>
                <option value="+377">Monaco (+377)</option>
                <option value="+976">Mongolia (+976)</option>
                <option value="+382">Montenegro (+382)</option>
                <option value="+212">Morocco (+212)</option>
                <option value="+258">Mozambique (+258)</option>
                <option value="+95">Myanmar (+95)</option>
                <option value="+264">Namibia (+264)</option>
                <option value="+674">Nauru (+674)</option>
                <option value="+977">Nepal (+977)</option>
                <option value="+31">Netherlands (+31)</option>
                <option value="+64">New Zealand (+64)</option>
                <option value="+505">Nicaragua (+505)</option>
                <option value="+227">Niger (+227)</option>
                <option value="+234">Nigeria (+234)</option>
                <option value="+850">North Korea (+850)</option>
                <option value="+389">North Macedonia (+389)</option>
                <option value="+47">Norway (+47)</option>
                <option value="+968">Oman (+968)</option>
                <option value="+92">Pakistan (+92)</option>
                <option value="+680">Palau (+680)</option>
                <option value="+507">Panama (+507)</option>
                <option value="+675">Papua New Guinea (+675)</option>
                <option value="+595">Paraguay (+595)</option>
                <option value="+51">Peru (+51)</option>
                <option value="+63">Philippines (+63)</option>
                <option value="+48">Poland (+48)</option>
                <option value="+351">Portugal (+351)</option>
                <option value="+974">Qatar (+974)</option>
                <option value="+40">Romania (+40)</option>
                <option value="+7">Russia (+7)</option>
                <option value="+250">Rwanda (+250)</option>
                <option value="+1-869">Saint Kitts and Nevis (+1-869)</option>
                <option value="+1-758">Saint Lucia (+1-758)</option>
                <option value="+1-784">Saint Vincent and the Grenadines (+1-784)</option>
                <option value="+685">Samoa (+685)</option>
                <option value="+378">San Marino (+378)</option>
                <option value="+239">Sao Tome and Principe (+239)</option>
                <option value="+966">Saudi Arabia (+966)</option>
                <option value="+221">Senegal (+221)</option>
                <option value="+381">Serbia (+381)</option>
                <option value="+248">Seychelles (+248)</option>
                <option value="+232">Sierra Leone (+232)</option>
                <option value="+65">Singapore (+65)</option>
                <option value="+421">Slovakia (+421)</option>
                <option value="+386">Slovenia (+386)</option>
                <option value="+677">Solomon Islands (+677)</option>
                <option value="+252">Somalia (+252)</option>
                <option value="+27">South Africa (+27)</option>
                <option value="+82">South Korea (+82)</option>
                <option value="+211">South Sudan (+211)</option>
                <option value="+34">Spain (+34)</option>
                <option value="+94">Sri Lanka (+94)</option>
                <option value="+249">Sudan (+249)</option>
                <option value="+597">Suriname (+597)</option>
                <option value="+46">Sweden (+46)</option>
                <option value="+41">Switzerland (+41)</option>
                <option value="+963">Syria (+963)</option>
                <option value="+886">Taiwan (+886)</option>
                <option value="+992">Tajikistan (+992)</option>
                <option value="+255">Tanzania (+255)</option>
                <option value="+66">Thailand (+66)</option>
                <option value="+670">Timor-Leste (+670)</option>
                <option value="+228">Togo (+228)</option>
                <option value="+676">Tonga (+676)</option>
                <option value="+1-868">Trinidad and Tobago (+1-868)</option>
                <option value="+216">Tunisia (+216)</option>
                <option value="+90">Turkey (+90)</option>
                <option value="+993">Turkmenistan (+993)</option>
                <option value="+688">Tuvalu (+688)</option>
                <option value="+256">Uganda (+256)</option>
                <option value="+380">Ukraine (+380)</option>
                <option value="+971">United Arab Emirates (+971)</option>
                <option value="+44">United Kingdom (+44)</option>
                <option value="+1">United States (+1)</option>
                <option value="+598">Uruguay (+598)</option>
                <option value="+998">Uzbekistan (+998)</option>
                <option value="+678">Vanuatu (+678)</option>
                <option value="+379">Vatican City (+379)</option>
                <option value="+58">Venezuela (+58)</option>
                <option value="+84">Vietnam (+84)</option>
                <option value="+967">Yemen (+967)</option>
                <option value="+260">Zambia (+260)</option>
                <option value="+263">Zimbabwe (+263)</option>



              </select>

              <input
                type="text"
                name="phone"
                placeholder="Enter your phone number"
                value={form.phone}
                onChange={handleChange}
                required
              />
              <select
                name="purpose"
                value={form.purpose}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Choose Occupation
                </option>
                <option value="STUDENT">Student</option>
                <option value="ENTREPRENEUR">Entrepreneur</option>
                <option value="STARTUP">Startup</option>
                <option value="LEGALITIES">Legalities</option>
                <option value="INFLUENCER">Influencer</option>
                <option value="EMPLOYEE">Employee</option>
                <option value="RECRUITER">Recruiter</option>
                <option value="INVESTOR">Investor</option>
                <option value="MARKETING">Marketing</option>
              </select>
              <input
                type="password"
                name="password"
                placeholder="Enter a password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="confirmpassword"
                placeholder="Enter confirm password"
                value={form.confirmpassword}
                onChange={handleChange}
                required
              />

              <button type="submit" onClick={enterOtp}>Submit</button>
            </form>
            {warn == false && <div class="warning-msg">
              <i class="fa fa-warning"></i>
              Please input correct values.
            </div>}
            {pass == false && <div class="warning-msg">
              <i class="fa fa-warning"></i>
              Confirm password doesn't match.
            </div>}
            {errormsg === 'loading' && <div class="info-msg">
              <i class="fa fa-info-circle"></i>
              Give us time to process.
            </div>}
            {errormsg === 'failed' && <div class="error-msg">
              <i class="fa fa-times-circle"></i>
              Something went wrong.
            </div>}
            {errormsg === 'warn' && <div class="warning-msg">
              <i class="fa fa-warning"></i>
              This is a warning message.
            </div>}
            {/* {status === 'succeeded' && <p>sucessfully registerd</p>} */}
          </div>
        ) : (
          <div className='vc-conatainer'>
            <div className='py-4'>
              <h4 className='text-xl font-medium'>Verify OTP</h4>
            </div>
            <div>
              <input placeholder='otp' type="text" className='p-4 py-2 border-2 rounded-full' value={otp} onChange={(e) => setOtp(e.target.value)} />
              {status_register === 'loading' && <div class="info-msg">
                <i class="fa fa-info-circle"></i>
                Give us time to process.
              </div>}
              {errormsg !== '' && errormsg !== 'existing user or data' ? <div class="error-msg">
                <i class="fa fa-times-circle"></i>
                Something went wrong.
              </div> : <></>}
              {errormsg === 'existing user or data' && <div class="warning-msg">
                <i class="fa fa-warning"></i>
                This user already exists.
              </div>}
            </div>
            <div className='mt-6 px-6 py-1 bg-sky-400 rounded-lg'>
              <button className='text-center ' onClick={handleSubmit}>Submit</button>
            </div>
            <div className='mt-4 px-6 py-1 bg-red-400 rounded-lg' onClick={() => setShowFirstComponent(true)}>
              <button className='text-center ' >Back</button>
            </div>

          </div>
        )
      }
    </div>
  );
}

export default RegisterForm