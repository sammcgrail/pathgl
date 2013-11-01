d3.select(window).on('load', function () {
  var canvas = d3.select('canvas')
    , svg = d3.select('svg')
    , dim = { height: 500, width: innerWidth * .499}

  canvas.attr(dim)
  window.$ && $('canvas').tooltip({ placement: 'bottom' })

  Rainbow.color(woah.toString(), 'javascript', function (result) {
    var code = d3.select('.code').html(result)
  })
  woah()
})
//geo, hexbin, force, arc
function woah () {
  function test (b) {
    var join = d3.select(b ? 'svg' : pathgl('canvas'))
               .selectAll('path')
               .data(data)

    var enter = join.enter().append('path')
    .attr('d', function (d) { return d.toString() })
    .attr('stroke', stroke)
    .attr('stroke-width', 2.5)
    .attr('fill', 'pink')
    .attr('transform', 'rotate(10, 350, 300)')


    enter.transition().duration(1000)
    .attr('stroke', stroke)
    .each('end', function k(d, i) {
      if (i == 0 && this.parentElement.tagName == 'svg') strokes = rando()

      join.transition().duration(1000)
      .attr('stroke', stroke)
      .each('end', k)
      .attr('d', function (d) { return d.toString() })
    })

      return enter
  }

  var x = 1
  var line = d3.svg.line()
             .x(function(d){ return d * 2})
             .y(function(d){ return d * x })


  var k = d3.svg.symbol().type('circle').size(1000)()

  var data = [ 'M 0 0 L 10 10 60 60 70 400 Z'
             , 'M 50 60 L 60 50 50 60 40 50 50 40 60 50 Z'

             , 'M 536.9357503463519 310L554.2562584220407'
             + ' 320L554.2562584220407 340L536.9357503463519'
             + ' 350L519.6152422706631 340L519.6152422706631 320Z'

             , texas()
             , signature()
             , {toString: heart}
             , {toString: function () { return line(d3.range(innerWidth / 10)) + 'Z' }}
             ]


  setInterval(function () {
    x = x === 20 ? 1 : 20
  }, 1000)

  var strokes = rando()
  svg  = test(1)
  webgl = test(0)

  function color(selection) {
    selection.transition().duration(1000).attr('stroke', stroke)
  }

  function recur (selection, fn) {
    selection
    .transition().duration(500)
    .call(fn)
    .each('end', recur, selection, fn)
  }

  function stroke(d, i) {
    return strokes[i]
  }

  function rando() {
    return data.map(function () { return '#' + Math.floor(Math.random() * 0xffffff).toString(16) })
  }

  function texas() {
    return "M466.6913034551947,475.8903885841019L467.54367137332275,478.52381249789215L466.05801957642126,475.86362705969566ZM466.6913034551947,475.8903885841019L465.7172767063054,473.95909213944043L465.7073909488878,471.29827834242394ZM465.7073909488878,471.29827834242394L465.3961412328966,471.1841246728539L465.6160756542583,465.15442741433077L465.94716971630925,464.2193830503823L466.0262621177508,462.4572613764876L467.91389985649346,458.6088227412684L468.33048453466125,458.7080986883087L466.1687721686628,464.22353878956125L465.63001896580244,467.5016184380922ZM469.2715299666373,455.97045723225335L470.77720231690495,454.04911535670703L468.68577806901243,457.9926545260664ZM474.2167168359879,449.5878316345748L472.2537551525173,452.29045345236614L472.50054603303494,450.83772841771093ZM474.75997445256155,449.22780833117827L474.93522946043475,448.863408832589L475.6118630259724,447.3912373171546L476.95209472322364,447.2768018295205L479.97548403812215,444.9259394155983L481.98919547203786,444.4656204889649ZM509.27763500762745,425.8998848864678L508.30825127795686,426.90324339077813L503.0952331712105,430.55043170376473L507.37506768349664,426.64707175842307ZM504.0483173266247,428.51748140494544L502.53497382167535,428.87360547811033L501.12879082870523,432.4484433180467L498.46707570469204,434.82684553245946L496.7366026979552,435.5559610207111L493.7194317361973,437.37933892095407L492.1288473116563,437.0472278244674L489.72169495781344,437.9929766138195L489.2922171912312,439.3157736018593L493.50794572213397,437.53822275265173L483.1544058511031,442.8042555634238L488.96212033908563,439.60518429757263L489.06803431738956,438.7391941091054L485.9723629333459,439.685987505094L483.3624000989424,438.9735369695649L482.24490250868513,438.3816464260104L481.6289951116242,437.76721819958505L481.50857480181355,439.62587444360685L479.43125952547297,438.8991774145544L479.24343715260477,437.79168708897845L477.8965499107006,437.5106105550735L477.8434954404652,437.5182542290316L477.8319403553193,437.4861307812821L477.8352160430233,437.86265338331924L478.63548679290824,439.82530029514317L482.1207591136316,442.708216392622L477.95785227690425,444.9164572332921L475.7287325555087,442.57337459024484L474.5062098073007,443.1711965903371L475.6202050441786,444.96477028630534L475.48917594756875,445.76994053677714L475.3027881745246,446.80057837293333L473.2830801205088,448.5651338734027L471.86347787825633,447.09556571815057L468.12044593384456,449.65694413503604L469.47628889471895,449.93601818086637L469.0079462167841,451.30975412808954L469.0545267014309,451.3863014057738L471.72116291216986,448.7530437298222L471.66350773194813,450.24510936500786L469.8358900814654,452.6301744661912L469.8177176556035,452.65793945523535L469.7207072852258,452.81267538215894L468.91316761343944,454.13177319068495L467.5529792192362,453.0239541503982L463.94870783980133,453.74498887614794L465.6624606389977,453.7629415006121L466.819180368551,456.6176555280297L467.83470302711254,456.467571310033L466.6134219762457,458.97365311185496L465.0484880075178,463.4179830733079L463.4904674227026,464.2441603666296L464.21085119718066,461.8224617592286L461.7492445141559,463.40532389883583L459.771078144094,461.5450632848497L460.92530582540246,463.9499298065901L459.00732862168724,464.00303485721054L461.1609592135367,464.17854122010306L462.8418620190515,465.07580304308186L464.89478980973144,464.4843283742945L464.03330093144035,469.04124415989423L462.9228176099492,469.33574061525013L462.6834337761669,472.59231416082343L463.94054871016624,473.8648081847702L464.36637516675574,476.78097429697243L464.53561626741964,479.97753747229615L465.21452582927986,480.3051377006496L466.7696216341854,484.3131405299909L466.4782587817025,485.64388402995513L468.2343816461366,486.4875423660838L467.4781976097975,488.556591272315L465.3400264104022,489.6144221840164L465.35836523087534,490.8727809710174L462.8689740503255,489.97927506932734L459.7783401123579,487.131525176644L457.1533225746289,486.4697265640871L451.55241572364605,486.66549467603613L448.30875935961626,484.6518000669574L447.35777095685205,483.3899530629007L444.9861591791149,482.710213561463L443.4683283808681,482.98961571415975L441.3740532850067,480.5792504178148L436.2301588527951,479.3229047816966L436.58681881070873,478.4073880985967L435.34041623529976,476.59825527063276L433.8474828859763,471.5106356990327L430.9944225910576,468.1156654255991L431.4223785378373,465.2514590721063L431.0212565921766,463.5740214422385L430.22778980905696,462.1681919246373L430.75383964502726,459.5799824251682L428.9425944624224,456.5552463509491L427.00792096840013,456.11108405159655L424.3560225809767,453.3790872529926L423.57422189852696,449.9545717507435L422.66249375208963,449.7184752270624L421.13715116916165,446.7557999188034L419.13982345773275,445.7566681401289L417.8639216323992,444.06364511372556L416.35671559798124,438.35316660262055L414.8296783237668,436.9326693577713L414.1722261478548,433.7825328080839L412.57549454603264,431.5178917200752L412.44625704845976,428.88309948705626L410.7681130667283,427.1147468377859L410.5214779905389,425.84362890550585L407.2177918037961,423.36894482200967L406.4060887846928,421.5803862465997L403.229721244836,419.929973842036L402.70346716407676,417.95325728649277L400.37054835604624,415.101048857666L399.0041334357651,415.5638715217343L395.39030457420637,414.91546406353916L389.6707245914248,414.3464141729811L386.47175771789574,412.5151290081835L385.222919770346,414.6388310906342L383.18679337994064,414.0697956891747L380.688284110331,414.6246525033322L378.1073502289588,418.6532529173261L376.7785599429184,421.65664938485975L376.43124628281277,424.34267489581123L374.71320846730475,424.71456607064545L371.77791853076286,428.43819272873986L367.2945097437147,426.7327689096319L365.4853249237638,424.47556923260095L362.8470265404159,423.8176204464187L361.7736272415029,422.22105647573414L358.9161673644321,421.36075769402373L357.20076323007976,420.276640937235L354.56057768903025,416.9112155223262L353.35588074149985,416.6939715857219L350.76901222981553,414.1333049330234L348.51924430639735,408.87596269252106L348.8173740620473,403.9061055626404L346.41409252242806,399.7138492633434L346.42191633165453,397.4633434168177L344.91074270531675,395.08525601323936L341.4789807814228,391.4349577217437L338.7191400877274,390.17339629988624L336.38414628065027,387.47987877525554L335.78441734036664,385.61486907056474L333.28336459428385,383.81921190772823L332.00780863487034,381.3896488129558L330.1751892245283,379.34078247222055L326.85734178251425,377.2508012834845L324.8054825976842,372.2471072272117L322.6154028545713,371.0391824926893L321.09083210717563,369.3163874251205L321.6476753156566,366.8434645828049L325.427881634904,367.2464783308974L331.375131669967,367.8671423643259L348.2983689911986,369.59126578270207L349.40805951898255,369.69427292397177L362.3336885362251,370.8536912577124L363.02714284330887,370.9112047990634L367.06967695177366,371.24390081714057L373.295869807155,371.73484244949907L377.41963891682934,372.0446079374566L377.54023000778665,370.4251612073283L378.14127254088316,362.27793299838356L378.750742883016,354.0936267267449L379.47203448185786,346.0544676899643L379.786953251143,342.6431881160827L380.2246237950613,337.8743855813759L380.94502670483314,328.91825855496916L380.95910083611994,328.72870267897895L381.5812874824734,320.5701569653421L381.8696135290184,316.68627369244405L382.19441969672346,312.3843477910167L382.8178058827885,304.13250778992983L382.9809207149744,301.9349394275548L383.43233101784443,295.99837177800146L384.03757568347476,287.62702497840087L384.62301173207675,287.67137445629874L397.0877796947734,288.5370490180676L399.01619813546927,288.65687471805586L405.0775753211997,289.04830888668766L413.07609619615016,289.5044793873428L415.0219253084762,289.60024485171334L421.082773313406,289.90847977457406L429.13443403629867,290.26480974864L428.8355636106172,298.6295362004786L428.6966416222832,301.92806126857784L428.4893299090866,306.8504129501988L428.33332689630805,310.55450511386766L428.14336831879683,315.06482876626944L428.02334793637806,317.9145593585172L427.7975691523128,323.275388036652L427.6940810185681,326.77355810551865L428.8374015535326,326.55704637791325L430.0051351000596,327.89322762435165L432.17275895104166,330.3877581174738L433.9605749916709,329.72968099033244L435.5468236478737,330.18421351268466L436.7072521641378,330.59144892485733L437.0857553465543,329.05890501746717L439.5452457839235,331.4388305218081L439.81342039212984,333.7623808551368L443.41873036305907,333.90620723527184L446.24690246315265,335.4223957856975L448.6350445123482,335.1006085962431L450.4924035140327,336.9240707393718L451.4660574346233,336.5730813485841L452.40408494207793,335.19826300519424L455.3845329588114,336.07727150416963L455.8758080541423,335.5423989163096L456.66527331573866,338.2129190594501L458.7612545147455,338.49187946470886L458.2258031540991,340.36103505936524L459.8783856657238,341.15964728401L462.7256430574031,338.61719670946786L464.6401250103249,340.28944173638877L465.8318253136035,340.0174414389812L466.14680104762584,341.43831511741996L467.5171254730379,341.8498701266726L468.51344333306594,340.56119870844816L470.4052192437686,340.3444852624508L470.10519311334895,342.2295751162369L471.58600777731226,343.7532548328737L471.7844786231407,342.3822771244361L474.13587434937995,339.49184737965834L474.2858411303568,339.395291125216L475.27859274747783,341.2734155545379L476.7617347862504,341.6773208472623L478.57935291518424,340.1932627092194L479.60411828790654,340.55368968422454L478.9903607825098,341.49870564995854L482.1235575023026,342.7923311260232L482.8111149735669,343.7541446039148L485.90073056412854,343.1044230866594L487.2855010139897,341.2894996024273L489.65550760020784,340.71883334612914L491.0211948044685,341.6146473939152L492.35150321627464,340.97524517981503L494.8210298211475,339.70668370184944L495.5597217056241,340.6806652250792L499.2561180382071,340.86168925892366L500.6626905036671,339.26408475417963L501.6381273549343,339.7418934762445L504.5125028965263,341.12341900452213L506.2075339217982,343.32225767844204L507.50869028977434,342.9453423142463L507.9937765823386,344.0687552384833L512.026688276214,345.2326761529613L513.5909950635445,346.95488902214265L517.1078409930085,346.04528132457995L518.8962912014035,346.71885044717874L519.0106337015973,352.00199328905865L519.108146754339,356.7373114152359L519.161576680072,359.3319147907865L519.2343169871344,362.86424697454356L519.3506267995466,368.5123519972294L519.4321117409187,372.1952293193615L519.9342936132971,376.2422713677694L522.1521662973722,378.7396841674629L523.5400814152658,381.3768505569691L522.9594036991786,383.56163316810125L524.879265404217,384.8677059340023L525.4769839552548,388.83586481454256L526.8713733583913,391.15652448857804L527.626782858231,390.9620624282127L528.3949291503093,393.8767467252758L527.6820742589927,396.896460672497L526.6068258100132,400.4983169381244L524.9374978053288,403.11067511660997L525.649370392738,404.90450347737385L524.9644427673775,405.6990952197132L524.6038585236926,406.8103885807359L525.5491088705195,408.6433030456734L525.4447498652934,412.2500565794144L523.3798675642045,415.7853736853642L522.1915105398982,416.97147597394655L523.6971315582971,419.00702879436244L520.8623189830987,419.30175098963844L515.3830442758372,421.6183051605309L515.122676125676,421.7351722482024L508.8367621514667,424.81753474934783L511.9818133437054,422.2463529140814L513.5132395313888,421.72680614773105L512.279149007006,421.47627180040604L509.1430563003461,422.36487457060616L509.80721032798425,418.0618080288282L508.0421362295507,417.3833732777856L506.9185908894483,419.7096495676359L506.0604763516583,419.51183384611386L504.60525431702365,418.9635447908116L503.6359138705357,416.8272261530029L503.1986616788916,417.9085206299852L505.16476917984585,419.58691775898046L504.60768883895946,422.01606351143073L506.3740290435654,422.99503090018175L506.6078722902949,426.5578846444115L505.89236661301373,426.3754884480186Z"
  }

  function signature() {
    return "M78 368L74 368L69 372L69 381L78 381L83 376L83 370L81 366L79 366L78 364L77 365L88 376L96 377L104 367L107 347L112 344L118 344L119 345L110 345L104 348L102 353L103 365L108 367L113 363L115 357L115 344L107 323L110 338L123 361L127 363L129 363L129 334L135 334L138 337L141 342L144 358L145 338L149 341L158 353L162 355L165 352L171 337L174 334L176 334L166 345L165 353L171 354L177 341L176 337L175 343L182 359L184 361L190 361L194 336L197 336L200 341L204 353L204 328L206 328L219 346L235 373L239 384Z"
  }


  function heart () {
    return "M232 112L232 110L223 99L210 89L202 87L175 87L168 90L165 96L163 103L163 124L174 139L182 146L197 156L210 160L224 171L234 185L238 196L238 202L238 195L231 184L230 172L237 162L260 148L273 133L281 115L281 102L275 90L264 82L249 78L228 77L222 83L219 95L220 108L226 113Z"
  }
}